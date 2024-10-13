import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import texts from "./text-copy.json" assert { type: "json" };
import { ToggleButton } from "./ToggleButton";

export const PreserveLogContext = createContext<{
  preserveLog: boolean | null;
  toggle: () => void;
}>({
  preserveLog: null,
  toggle: () => {},
});

export function PreserveLogToggle(): JSX.Element {
  const { preserveLog, toggle } = useContext(PreserveLogContext);

  return (
    <ToggleButton
      className="preserve-log"
      value={preserveLog ?? false}
      onToggle={toggle}
      mode="plain"
      id="preserve-log"
    >
      {texts.controls.preserveLog}
    </ToggleButton>
  );
}

export function PreserveLogToggleContextWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [preserveLog, setPreserveLog] = useState<boolean | null>(null);

  useEffect(() => {
    if (preserveLog === null) {
      return;
    }

    chrome.storage.sync.set({ preserveLog });
  }, [setPreserveLog, preserveLog]);

  useEffect(() => {
    chrome.storage.sync.get(
      "preserveLog",
      ({ preserveLog }: { preserveLog: boolean }) => {
        setPreserveLog(preserveLog);
      }
    );
  }, [setPreserveLog]);

  const toggle = useCallback(() => {
    setPreserveLog((value) => !value);
  }, [setPreserveLog]);

  return (
    <PreserveLogContext.Provider value={{ preserveLog, toggle }}>
      {children}
    </PreserveLogContext.Provider>
  );
}
