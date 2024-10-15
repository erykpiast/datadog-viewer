import ReactJson from "react-json-view";

import "./EventPreviewDetails.css";
import { useTheme } from "./useTheme";

export function EventPreviewDetails({
  className,
  event,
}: {
  className: string;
  event: any;
}): JSX.Element {
  const theme = useTheme({
    dark: "tomorrow",
    light: "rjv-default",
  } as const);

  return (
    <section className={`${className} event-preview-details`}>
      <ReactJson
        src={event}
        collapsed={1}
        theme={theme}
        enableClipboard={false}
        displayDataTypes={false}
        indentWidth={2}
      />
    </section>
  );
}
