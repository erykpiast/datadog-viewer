import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/vital.svg";

export function VitalEventOverview({
  event,
  name,
}: {
  event: { vital: { description: string; type: string } };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.vital.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{event.vital.type}</span>
        &nbsp;&middot;&nbsp;
        <span>{event.vital.description}</span>
      </p>
    </div>
  );
}
