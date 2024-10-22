import { type ReactNode, createContext, useCallback, useContext } from "react";

import texts from "./text-copy.json" assert { type: "json" };
import { ToggleButton } from "./ToggleButton";
import { usePersistentSetting } from "./usePersistentSetting";

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
  const [preserveLog, setPreserveLog] = usePersistentSetting<boolean | null>(
    "preserveLog",
    null
  );

  const toggle = useCallback(() => {
    setPreserveLog((value) => !value);
  }, [setPreserveLog]);

  return (
    <PreserveLogContext.Provider value={{ preserveLog, toggle }}>
      {children}
    </PreserveLogContext.Provider>
  );
}
