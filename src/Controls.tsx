import { type ComponentProps } from "react";

import { ClearEvents } from "./ClearEvents";
import { FiltersToggle } from "./Filters";
import { PreserveLogToggle } from "./PreserveLogToggle";
import { RecordActivityToggle } from "./RecordActivityToggle";
import { SettingsToggle } from "./Settings";

import "./Controls.css";

export function Controls({
  clearEvents,
}: {
  clearEvents: ComponentProps<typeof ClearEvents>["onClick"];
}): JSX.Element {
  return (
    <nav className="controls">
      <RecordActivityToggle />
      <ClearEvents onClick={clearEvents} />
      <hr />
      <FiltersToggle />
      <hr />
      <PreserveLogToggle />
      <hr style={{ marginLeft: "auto", marginRight: 0 }} />
      <SettingsToggle />
    </nav>
  );
}
