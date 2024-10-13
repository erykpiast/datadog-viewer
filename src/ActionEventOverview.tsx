import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/action.svg";

export function ActionEventOverview({
  event,
  name,
}: {
  event: { action: { type: string } };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.action.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{event.action.type} {texts.eventsList.action.name}</span>
      </p>
    </div>
  );
}
