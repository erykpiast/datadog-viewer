import Fuse from "fuse.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import texts from "./text-copy.json" assert { type: "json" };

import "./Filters.css";
import { ToggleButton } from "./ToggleButton";

function filterEvents<T extends { type: string }>(
  events: Array<T>,
  filter: string
): Array<T> {
  if (!filter) {
    return events;
  }

  const fuse = new Fuse(events, {
    threshold: 0.4,
    keys: ["type"],
  });

  return fuse.search(filter).map((result) => result.item);
}

const FiltersPanelContext = createContext<{
  areFiltersVisible: boolean | null;
  toggle: () => void;
}>({
  areFiltersVisible: null,
  toggle: () => {},
});

interface FiltersProps<TEvent> {
  events: Array<TEvent>;
  onFilteredEventsChange: (filteredEvents: Array<TEvent>) => void;
}

export function Filters<TEvent extends { type: string }>({
  events,
  onFilteredEventsChange,
}: FiltersProps<TEvent>): JSX.Element {
  const [filter, setFilter] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<string>("");

  const eventTypes = useMemo(
    () =>
      Array.from(new Set(events.map((event) => event.type))).filter(Boolean),
    [events]
  );

  useEffect(() => {
    let filteredEvents = events;

    if (selectedEventType) {
      filteredEvents = filteredEvents.filter(
        (event) => event.type === selectedEventType
      );
    }

    filteredEvents = filterEvents(filteredEvents, filter);

    onFilteredEventsChange(filteredEvents);
  }, [events, filter, selectedEventType, onFilteredEventsChange]);

  const clearSearch = () => {
    setFilter("");
  };

  return (
    <form className="filters">
      <fieldset className="filter-input">
        <button onClick={clearSearch} type="reset">
          {texts.filters.search.clear}
        </button>
        <input
          onChange={(e) => setFilter(e.target.value)}
          placeholder={texts.filters.search.placeholder}
          type="search"
          value={filter}
        />
      </fieldset>
      <fieldset className="filter-pills">
        <input
          checked={selectedEventType === ""}
          id="filter-type-all"
          key="filter-type-all-input"
          name="type"
          onChange={() => setSelectedEventType("")}
          type="radio"
          value=""
        />
        <label htmlFor="filter-type-all" key="filter-type-all-label">
          {texts.filters.allTypes}
        </label>
        {eventTypes.length > 0 ? <hr /> : null}
        {eventTypes.map((eventType) => (
          <>
            <input
              type="radio"
              id={`filter-type-${eventType}`}
              key={`filter-type-${eventType}-input`}
              name="type"
              value={eventType}
              checked={selectedEventType === eventType}
              onChange={() => setSelectedEventType(eventType)}
            />
            <label htmlFor={`filter-type-${eventType}`}>{eventType}</label>
          </>
        ))}
      </fieldset>
    </form>
  );
}

export function FiltersToggle(): JSX.Element {
  const { areFiltersVisible, toggle } = useContext(FiltersPanelContext);

  return (
    <ToggleButton
      className="filters-toggle"
      value={areFiltersVisible ?? false}
      onToggle={toggle}
      id="filters-toggle"
    >
      {texts.filters.toggle}
    </ToggleButton>
  );
}

export function FiltersPanelWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [areFiltersVisible, setAreFiltersVisible] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (areFiltersVisible === null) {
      return;
    }

    chrome.storage.sync.set({ areFiltersVisible });
  }, [setAreFiltersVisible, areFiltersVisible]);

  useEffect(() => {
    chrome.storage.sync.get(
      "areFiltersVisible",
      ({ areFiltersVisible }: { areFiltersVisible: boolean }) => {
        setAreFiltersVisible(areFiltersVisible);
      }
    );
  }, [setAreFiltersVisible]);

  const toggle = useCallback(() => {
    setAreFiltersVisible((value) => !value);
  }, []);

  return (
    <FiltersPanelContext.Provider value={{ areFiltersVisible, toggle }}>
      {children}
    </FiltersPanelContext.Provider>
  );
}
