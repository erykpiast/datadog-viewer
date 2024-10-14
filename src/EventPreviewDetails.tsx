import ReactJson from "react-json-view";

import "./EventPreviewDetails.css";

export function EventPreviewDetails({
  className,
  event,
}: {
  className: string;
  event: any;
}): JSX.Element {
  return (
    <section className={`${className} event-preview-details`}>
      <ReactJson
        src={event}
        collapsed={1}
        theme="tomorrow"
        enableClipboard={false}
        displayDataTypes={false}
        indentWidth={2}
      />
    </section>
  );
}
