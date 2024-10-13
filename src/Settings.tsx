import {
  type ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { DomainContext } from "./DomainContext";
import texts from "./text-copy.json" assert { type: "json" };
import { ToggleButton } from "./ToggleButton";

import "./Settings.css";

const SettingsPanelContext = createContext<{
  areSettingsVisible: boolean | null;
  toggle: () => void;
}>({
  areSettingsVisible: false,
  toggle: () => {},
});

export function SettingsPanel(): JSX.Element | null {
  const { domain, setDomain } = useContext(DomainContext);
  const { areSettingsVisible } = useContext(SettingsPanelContext);

  const handleDomainChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDomain(e.target.value);
    },
    [setDomain]
  );

  if (!areSettingsVisible) {
    return null;
  }

  return (
    <form className="settings">
      <label htmlFor="domain">{texts.settings.domain}</label>
      <input
        id="domain"
        onChange={handleDomainChange}
        pattern="^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$"
        title={texts.settings.domainHint}
        type="text"
        value={domain ?? ""}
      />
    </form>
  );
}

export function SettingsToggle(): JSX.Element {
  const { areSettingsVisible, toggle } = useContext(SettingsPanelContext);

  return (
    <ToggleButton
      className="settings-toggle"
      value={areSettingsVisible ?? false}
      onToggle={toggle}
      id="settings-toggle"
    >
      {texts.settings.button}
    </ToggleButton>
  );
}

export function SettingsPanelWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [areSettingsVisible, setAreSettingsVisible] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (areSettingsVisible === null) {
      return;
    }

    chrome.storage.sync.set({ areSettingsVisible });
  }, [setAreSettingsVisible, areSettingsVisible]);

  useEffect(() => {
    chrome.storage.sync.get(
      "areSettingsVisible",
      ({ areSettingsVisible }: { areSettingsVisible: boolean }) => {
        setAreSettingsVisible(areSettingsVisible);
      }
    );
  }, [setAreSettingsVisible]);

  const toggle = useCallback(() => {
    setAreSettingsVisible((prev) => !prev);
  }, []);

  return (
    <SettingsPanelContext.Provider value={{ areSettingsVisible, toggle }}>
      {children}
    </SettingsPanelContext.Provider>
  );
}
