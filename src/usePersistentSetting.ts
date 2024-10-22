import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function usePersistentSetting<TSetting>(
  key: string,
  defaultValue: TSetting,
  hostnameSpecific: boolean = false
): [TSetting, Dispatch<SetStateAction<TSetting>>] {
  const [setting, setSetting] = useState<TSetting>(defaultValue);
  const [hostname, setHostname] = useState<string | null>(null);
  const manualSetting = useRef(false);

  useEffect(() => {
    if (!hostnameSpecific) {
      setHostname("*");
      return;
    }

    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.devtools.inspectedWindow.eval(
      "window.location.hostname",
      (hostname: string, isException: boolean) => {
        if (isException) {
          return;
        }

        setHostname(hostname.split(".").slice(-2).join("."));
      }
    );
  }, []);

  useEffect(() => {
    if (
      (setting === defaultValue && !manualSetting.current) ||
      hostname === null
    ) {
      return;
    }

    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.set({ [`${hostname}:${key}`]: setting });

    manualSetting.current = false;
  }, [hostname, setting, key, defaultValue]);

  useEffect(() => {
    if (hostname === null) {
      return;
    }

    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.get(
      `${hostname}:${key}`,
      ({ [`${hostname}:${key}`]: value }: { [key: string]: TSetting }) => {
        setSetting(value ?? defaultValue);
      }
    );
  }, [hostname, setSetting, key, defaultValue]);

  const handleSettingChange = useCallback(
    (...args: Parameters<typeof setSetting>) => {
      manualSetting.current = true;
      setSetting(...args);
    },
    []
  );

  return [setting, handleSettingChange];
}
