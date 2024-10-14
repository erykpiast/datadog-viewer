import { useState } from "react";

import texts from "./text-copy.json" assert { type: "json" };

import "./EventPreview.css";

import { getEventName } from "./event";
import { EventPreviewDetails } from "./EventPreviewDetails";
import { EventPreviewOverview } from "./EventPreviewOverview";
import { Tabs } from "./Tabs";

interface EventPreviewProps {
  event: Parameters<typeof getEventName>[0];
  onClose: () => void;
}

export function EventPreview({
  event,
  onClose,
}: EventPreviewProps): JSX.Element {
  const eventName = getEventName(event);
  const [selectedTabId, setSelectedTabId] = useState("overview");

  return (
    <section className="event-preview">
      <header>
        <nav>
          <button className="icon-button close" onClick={onClose}>
            <span>{texts.eventPreview.close}</span>
          </button>
          <Tabs
            onTabChange={setSelectedTabId}
            seletedTabId={selectedTabId}
            tabs={[
              {
                id: "overview",
                label: texts.eventPreview.tabs.overview.header,
              },
              {
                id: "details",
                label: texts.eventPreview.tabs.details.header,
              },
            ]}
          />
        </nav>
      </header>
      <main>
        {selectedTabId === "overview" ? (
          <EventPreviewOverview className="tab-overview" event={event} />
        ) : null}
        {selectedTabId === "details" ? (
          <EventPreviewDetails className="tab-details" event={event} />
        ) : null}
      </main>
    </section>
  );
}
