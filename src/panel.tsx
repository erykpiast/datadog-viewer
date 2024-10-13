import {
  type ComponentProps,
  useCallback,
  useState,
  useTransition,
} from "react";
import { createRoot } from "react-dom/client";

import { Controls } from "./Controls";
import { DomainContextWrapper } from "./DomainContext";
import { EventPreview } from "./EventPreview";
import { EventsList } from "./EventsList";
import { Filters, FiltersPanelWrapper } from "./Filters";
import { PreserveLogToggleContextWrapper } from "./PreserveLogToggle";
import { RecordActivityContextWrapper } from "./RecordActivityToggle";
import { SettingsPanel, SettingsPanelWrapper } from "./Settings";
import { useDataDogEvents } from "./useDataDogEvents";

import "./panel.css";

export function DataDogEventMonitor() {
  const [selectedEvent, setSelectedEvent] = useState<
    ComponentProps<typeof EventsList>["events"][number] | null
  >(null);
  const [filteredEvents, setFilteredEvents] = useState<
    ComponentProps<typeof EventsList>["events"]
  >([]);
  const [isPending, startTransition] = useTransition();

  const resetSelectedEvent = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const { events, clearEvents } =
    useDataDogEvents<
      NonNullable<ComponentProps<typeof EventsList>["selectedEvent"]>
    >(resetSelectedEvent);

  const handleFilteredEventsChange = useCallback(
    (filtered: ComponentProps<typeof EventsList>["events"]) => {
      startTransition(() => {
        setFilteredEvents(filtered);
      });
      resetSelectedEvent();
    },
    []
  );

  return (
    <section className="panel">
      <header>
        <Controls clearEvents={clearEvents} />
        <Filters
          events={events}
          onFilteredEventsChange={handleFilteredEventsChange}
        />
        <SettingsPanel />
      </header>
      <main className={isPending ? "loading" : ""}>
        <EventsList
          events={filteredEvents}
          onSelect={(event) => setSelectedEvent(event)}
          selectedEvent={selectedEvent}
        />
      </main>
      {selectedEvent && (
        <aside>
          <EventPreview event={selectedEvent} onClose={resetSelectedEvent} />
        </aside>
      )}
    </section>
  );
}

// eslint-disable-next-line no-restricted-syntax
window.addEventListener("load", () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(
      <SettingsPanelWrapper>
        <FiltersPanelWrapper>
          <DomainContextWrapper>
            <RecordActivityContextWrapper>
              <PreserveLogToggleContextWrapper>
                <DataDogEventMonitor />
              </PreserveLogToggleContextWrapper>
            </RecordActivityContextWrapper>
          </DomainContextWrapper>
        </FiltersPanelWrapper>
      </SettingsPanelWrapper>
    );
  }
});
