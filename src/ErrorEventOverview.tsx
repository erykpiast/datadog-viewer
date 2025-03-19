import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/error.svg";

export function ErrorEventOverview({
  event,
  name,
}: {
  event: { error: { source: string; handling?: string } };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.error.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>
          {event.error.source ?? texts.eventsList.error.defaults.source}
        </span>
        &nbsp;&middot;&nbsp;
        <span>
          {event.error.handling ?? texts.eventsList.error.defaults.handling}
        </span>
      </p>
    </div>
  );
}
