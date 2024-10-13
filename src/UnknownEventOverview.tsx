import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/unknown.svg";

export function UnknownEventOverview({
  event,
  name
}: {
  event: { type: string };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.unknown.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{event.type}</span>
      </p>
    </div>
  );
}
