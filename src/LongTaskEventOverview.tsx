import texts from "./text-copy.json" assert { type: "json" };

import icon from "./icons/long-task.svg";

export function LongTaskEventOverview({
  event,
  name,
}: {
  event: { long_task: { duration: number } };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={icon}
          alt={texts.eventsList.longTask.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{texts.eventsList.longTask.name}</span>
      </p>
    </div>
  );
}
