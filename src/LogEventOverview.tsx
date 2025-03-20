import texts from "./text-copy.json" assert { type: "json" };

import debugIcon from "./icons/log_debug.svg";
import errorIcon from "./icons/log_error.svg";
import infoIcon from "./icons/log_info.svg";
import logOther from "./icons/log_other.svg";
import warnIcon from "./icons/log_warn.svg";

function getIcon(status: string) {
  switch (status) {
    case "error":
      return errorIcon;
    case "warn":
      return warnIcon;
    case "info":
      return infoIcon;
    case "debug":
      return debugIcon;
    default:
      return logOther;
  }
}

export function LogEventOverview({
  event,
  name,
}: {
  event: { logger: { name: string }; status: string };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={getIcon(event.status)}
          alt={texts.eventsList.log.iconAlt}
          height="20"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>{event.status}</span>
        &nbsp;&middot;&nbsp;
        <span>{event.logger.name}</span>
      </p>
    </div>
  );
}
