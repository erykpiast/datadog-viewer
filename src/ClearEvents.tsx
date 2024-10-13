import { IconButton } from "./IconButton";
import * as texts from "./text-copy.json" assert { type: "json" };

import "./ClearEvents.css";

export function ClearEvents({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <IconButton className="clear-events" mode="button" onClick={onClick}>
      {texts.controls.clearEvents}
    </IconButton>
  );
}
