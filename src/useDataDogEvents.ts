import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { DomainContext } from "./DomainContext";
import { PreserveLogContext } from "./PreserveLogToggle";
import { RecordActivityContext } from "./RecordActivityToggle";
import { maybeDecodeDeflate } from "./decode";

export function useDataDogEvents<T>(onClearEvents: () => void): {
  events: Array<T>;
  clearEvents: () => void;
} {
  const [events, setEvents] = useState<T[]>([]);
  const { domain } = useContext(DomainContext);
  const { isRecording } = useContext(RecordActivityContext);
  const { preserveLog } = useContext(PreserveLogContext);
  const minTime = useRef(Infinity);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const listener = async ({
      request,
    }: {
      request: { postData?: { mimeType: string; text: string }; url: string };
    }) => {
      const parsed = new URL(request.url);

      if (parsed.hostname !== domain) {
        return;
      }

      if (!request.postData || !request.postData.text) {
        return;
      }

      if (!request.postData.mimeType.startsWith("text/plain")) {
        return;
      }

      const decoded = await maybeDecodeDeflate(request.postData.text);

      const lines = decoded.split("\n").filter((line: string) => line.trim());
      const newEvents = lines.map((line: string) => JSON.parse(line));

      newEvents.forEach((event: { date: number }) => {
        if (event.date < minTime.current) {
          minTime.current = event.date;
        }
      });

      newEvents.forEach((event: { date: number; relativeTime: number }) => {
        event.relativeTime = event.date - minTime.current;
      });

      newEvents.forEach(
        (event: { type?: unknown; user_action?: unknown; error?: unknown }) => {
          if ("type" in event) {
            return;
          }

          if ("user_action" in event) {
            if ("error" in event) {
              event.type = "error";

              if (
                "message" in event &&
                typeof event.message === "string" &&
                typeof event.error === "object" &&
                event.error !== null
              ) {
                const [message, ...stack] = event.message.split(" at ");
                Object.assign(event.error, {
                  message,
                  source: "user action",
                  stack: stack.map((line) => `  at ${line}`),
                });
              }
            }

            if ("logger" in event) {
              event.type = "log";
            }
          }
        }
      );

      setEvents((prev) => [...prev, ...newEvents]);
    };

    /* @ts-expect-error TODO: type chrome interface properly */
    window.chrome.devtools.network.onRequestFinished.addListener(listener);

    return () => {
      /* @ts-expect-error TODO: type chrome interface properly */
      window.chrome.devtools.network.onRequestFinished.removeListener(listener);
    };
  }, [domain, isRecording]);

  const clearEvents = useCallback(() => {
    setEvents([]);
    onClearEvents();
  }, [onClearEvents]);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const listener = () => {
      if (preserveLog === false) {
        clearEvents();
        minTime.current = Infinity;
      }
    };

    window.chrome.devtools.network.onNavigated.addListener(listener);

    return () => {
      window.chrome.devtools.network.onNavigated.removeListener(listener);
    };
  }, [isRecording, preserveLog, clearEvents]);

  return { events, clearEvents };
}
