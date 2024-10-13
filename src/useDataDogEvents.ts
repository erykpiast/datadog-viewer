import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { DomainContext } from "./DomainContext";
import { PreserveLogContext } from "./PreserveLogToggle";
import { RecordActivityContext } from "./RecordActivityToggle";

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

    const listener = ({
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

      const lines = request.postData.text
        .split("\n")
        .filter((line: string) => line.trim());
      const newEvents = lines.map((line: string) => JSON.parse(line));

      newEvents.forEach((event: { date: number }) => {
        if (event.date < minTime.current) {
          minTime.current = event.date;
        }
      });

      newEvents.forEach((event: { date: number; relativeTime: number }) => {
        event.relativeTime = event.date - minTime.current;
      });

      setEvents((prev) => [...prev, ...newEvents]);
    };

    /* @ts-expect-error */
    window.chrome.devtools.network.onRequestFinished.addListener(listener);

    return () => {
      /* @ts-expect-error */
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
      }
    };

    window.chrome.devtools.network.onNavigated.addListener(listener);

    return () => {
      window.chrome.devtools.network.onNavigated.removeListener(listener);
    };
  }, [isRecording, preserveLog, clearEvents]);

  return { events, clearEvents };
}
