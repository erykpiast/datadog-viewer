import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import * as texts from "./text-copy.json" assert { type: "json" };
import { ToggleButton } from "./ToggleButton";

import "./RecordActivityToggle.css";

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
  const [isRecording, setIsRecording] = useState<boolean | null>(null);

  useEffect(() => {
    if (isRecording === null) {
      return;
    }

    chrome.storage.sync.set({ isRecording });
  }, [setIsRecording, isRecording]);

  useEffect(() => {
    chrome.storage.sync.get(
      "isRecording",
      ({ isRecording }: { isRecording: boolean }) => {
        setIsRecording(isRecording);
      }
    );
  }, [setIsRecording]);

  const toggle = useCallback(() => {
    setIsRecording((value) => !value);
  }, [setIsRecording]);

  return (
    <RecordActivityContext.Provider value={{ isRecording, toggle }}>
      {children}
    </RecordActivityContext.Provider>
  );
}
