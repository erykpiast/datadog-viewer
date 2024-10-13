import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/view.svg";

export function ViewEventOverview({
  event,
  name,
}: {
  event: { view: { is_active: boolean; loading_type: string } };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.view.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{event.view.loading_type}</span>
        &nbsp;&middot;&nbsp;
        <span>
          {event.view.is_active
            ? texts.eventsList.view.active
            : texts.eventsList.view.notActive}
        </span>
      </p>
    </div>
  );
}
