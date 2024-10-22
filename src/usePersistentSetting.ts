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
  defaultValue: TSetting
): [TSetting, Dispatch<SetStateAction<TSetting>>] {
  const [setting, setSetting] = useState<TSetting>(defaultValue);
  const manualSetting = useRef(false);

  useEffect(() => {
    if (setting === defaultValue && !manualSetting.current) {
      return;
    }

    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.set({ [key]: setting });

    manualSetting.current = false;
  }, [setSetting, setting, key, defaultValue]);

  useEffect(() => {
    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.get(
      key,
      ({ [key]: value }: { [key: string]: TSetting }) => {
        setSetting(value ?? defaultValue);
      }
    );
  }, [setSetting, key, defaultValue]);

  const handleSettingChange = useCallback(
    (...args: Parameters<typeof setSetting>) => {
      manualSetting.current = true;
      setSetting(...args);
    },
    []
  );

  return [setting, handleSettingChange];
}
