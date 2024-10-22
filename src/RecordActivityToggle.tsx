import { type ReactNode, createContext, useCallback, useContext } from "react";

import * as texts from "./text-copy.json" assert { type: "json" };
import { ToggleButton } from "./ToggleButton";

import "./RecordActivityToggle.css";
import { usePersistentSetting } from "./usePersistentSetting";

export function RecordActivityToggle(): JSX.Element {
  const { isRecording, toggle } = useContext(RecordActivityContext);

  return (
    <ToggleButton
      className="record-activity-toggle"
      value={isRecording ?? false}
      onToggle={toggle}
      id="record-activity"
    >
      {texts.controls.recordActivity}
    </ToggleButton>
  );
}

export const RecordActivityContext = createContext<{
  isRecording: boolean | null;
  toggle: () => void;
}>({
  isRecording: null,
  toggle: () => {},
});

export function RecordActivityContextWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isRecording, setIsRecording] = usePersistentSetting(
    "isRecording",
    true
  );

  const toggle = useCallback(() => {
    setIsRecording((value) => !value);
  }, [setIsRecording]);

  return (
    <RecordActivityContext.Provider value={{ isRecording, toggle }}>
      {children}
    </RecordActivityContext.Provider>
  );
}
