import ReactJson from "react-json-view";

import texts from "./text-copy.json" assert { type: "json" };

import "./EventPreview.css";

import { getEventName } from "./event";

interface EventPreviewProps {
  event: Parameters<typeof getEventName>[0];
  onClose: () => void;
}

export function EventPreview({
  event,
  onClose,
}: EventPreviewProps): JSX.Element {
  const eventName = getEventName(event);

  return (
    <section className="event-preview">
      <header>
        <h2>
          {event.type}&nbsp;·&nbsp;{eventName}
        </h2>
        <nav>
          <button className="icon-button close" onClick={onClose}>
            <span>{texts.eventPreview.close}</span>
          </button>
        </nav>
      </header>
      <main>
        <ReactJson
          src={event}
          collapsed={1}
          theme="tomorrow"
          enableClipboard={false}
          displayDataTypes={false}
          indentWidth={2}
        />
      </main>
    </section>
  );
}
