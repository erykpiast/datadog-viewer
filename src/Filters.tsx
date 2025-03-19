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
import { usePersistentSetting } from "./usePersistentSetting";

type FilterableEvent = {
  service: string;
} & (
  | {
      type: "view";
      view: {
        name: string;
        url: string;
      };
    }
  | {
      type: "action";
      action: { target: { name: string }; type: string };
    }
  | {
      type: "resource";
      resource: {
        name: string;
        render_blocking_status: string;
        type:
          | "binary"
          | "css"
          | "fetch"
          | "font"
          | "document"
          | "image"
          | "js"
          | "other"
          | "video"
          | "xhr";
        url: string;
      };
    }
  | {
      type: "vital";
      vital: {
        name: string;
        description: string;
        type: string;
      };
    }
  | {
      type: "long_task";
    }
  | {
      type: "error";
      error: {
        message: string;
        stack: string;
      };
    }
);

function filterEvents<TEvent extends FilterableEvent>(
  events: Array<TEvent>,
  filter: string
): Array<TEvent> {
  if (!filter) {
    return events;
  }

  const fuse = new Fuse(events, {
    keys: [
      "service",
      {
        name: "view.name",
        weight: 0.5,
      },
      {
        name: "view.url",
        weight: 0.3,
      },
      {
        name: "action.target.name",
        weight: 0.5,
      },
      {
        name: "resource.name",
        weight: 0.5,
      },
      {
        name: "resource.url",
        weight: 0.3,
      },
      {
        name: "vital.name",
        weight: 0.5,
      },
      {
        name: "vital.description",
        weight: 0.3,
      },
      {
        name: "error.message",
        weight: 0.5,
      },
      {
        name: "error.stack",
        weight: 0.1,
      },
    ],
    includeScore: true,
    threshold: 0.4,
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
  onFiltersChange: () => void;
}

export function Filters<TEvent extends FilterableEvent>({
  events,
  onFilteredEventsChange,
  onFiltersChange,
}: FiltersProps<TEvent>): JSX.Element {
  const [filter, setFilter] = useState<string>("");
  const [selectedEventType, setSelectedEventType] = useState<
    FilterableEvent["type"] | null
  >(null);

  const eventTypes = useMemo(
    () =>
      Array.from(new Set(events.map((event) => event.type))).filter(Boolean),
    [events]
  );

  useEffect(() => {
    let filteredEvents = events;

    if (selectedEventType !== null) {
      filteredEvents = filteredEvents.filter(
        (event) => event.type === selectedEventType
      );
    }

    filteredEvents = filterEvents(filteredEvents, filter);

    onFilteredEventsChange(filteredEvents);
  }, [events, filter, selectedEventType, onFilteredEventsChange]);

  const clearSearch = useCallback(() => {
    setFilter("");
  }, []);

  const handleSearchPhraseChange = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      setFilter(value);
      onFiltersChange();
    },
    [onFiltersChange]
  );

  const handleTypeFilterChange = useCallback(
    ({ target: { value } }: { target: { value: string | "" } }) => {
      if (
        value === "view" ||
        value === "action" ||
        value === "resource" ||
        value === "vital" ||
        value === "long_task" ||
        value === "error"
      ) {
        setSelectedEventType(value);
        onFiltersChange();
        return;
      } else if (value === "") {
        setSelectedEventType(null);
        onFiltersChange();
      }
    },
    [onFiltersChange]
  );

  return (
    <form className="filters">
      <fieldset className="filter-input">
        <button onClick={clearSearch} type="reset">
          {texts.filters.search.clear}
        </button>
        <input
          onChange={handleSearchPhraseChange}
          placeholder={texts.filters.search.placeholder}
          type="search"
          value={filter}
        />
      </fieldset>
      <fieldset className="filter-pills">
        <input
          checked={selectedEventType === null}
          id="filter-type-all"
          key="filter-type-all-input"
          name="type"
          onChange={handleTypeFilterChange}
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
              onChange={handleTypeFilterChange}
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
  const [areFiltersVisible, setAreFiltersVisible] = usePersistentSetting(
    "areFiltersVisible",
    true
  );

  const toggle = useCallback(() => {
    setAreFiltersVisible((value) => !value);
  }, []);

  return (
    <FiltersPanelContext.Provider value={{ areFiltersVisible, toggle }}>
      {children}
    </FiltersPanelContext.Provider>
  );
}
