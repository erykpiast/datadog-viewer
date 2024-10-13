import texts from "./text-copy.json" assert { type: "json" };

import binaryIcon from "./icons/resource/binary.svg";
import cssIcon from "./icons/resource/css.svg";
import fontIcon from "./icons/resource/font.svg";
import htmlIcon from "./icons/resource/html.svg";
import imageIcon from "./icons/resource/image.svg";
import jsIcon from "./icons/resource/js.svg";
import jsonIcon from "./icons/resource/json.svg";
import otherIcon from "./icons/resource/other.svg";
import videoIcon from "./icons/resource/video.svg";

const icons = {
  binary: binaryIcon,
  css: cssIcon,
  fetch: jsonIcon,
  font: fontIcon,
  document: htmlIcon,
  image: imageIcon,
  js: jsIcon,
  other: otherIcon,
  video: videoIcon,
  xhr: jsonIcon,
};

export function ResourceEventOverview({
  event,
  name,
}: {
  event: {
    resource: {
      type: keyof typeof icons;
      render_blocking_status?: string;
      status_code?: number;
    };
  };
  name: string;
}): JSX.Element {
  return (
    <div className="event-overview">
      <figure>
        <img
          src={
            event.resource.type in icons
              ? icons[event.resource.type]
              : icons.other
          }
          alt={`${event.resource.type} ${texts.eventsList.resource.iconAlt}`}
          height="26"
          width="20"
        />
      </figure>
      <h3>{name}</h3>
      <p>
        <span>
          {event.resource.render_blocking_status ??
            texts.eventsList.resource.defaults.renderBlockingStatus}
        </span>
        &nbsp;&middot;&nbsp;
        <span>
          {event.resource.status_code ??
            texts.eventsList.resource.defaults.requestStatusCode}
        </span>
      </p>
    </div>
  );
}
