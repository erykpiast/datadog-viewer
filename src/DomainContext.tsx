import { createContext, useEffect, useState } from "react";

export const DomainContext = createContext<{
  domain: string | null;
  setDomain: (newDomain: string) => void;
}>({
  domain: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDomain: (_newDomain: string) => {},
});

export function DomainContextWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    if (domain === null) {
      return;
    }

    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.set({ domain });
  }, [domain]);

  useEffect(() => {
    /* @ts-expect-error TODO: type chrome interface properly */
    chrome.storage.sync.get("domain", ({ domain }: { domain: string }) => {
      setDomain(domain);
    });
  }, [setDomain]);

  return (
    <DomainContext.Provider value={{ domain, setDomain }}>
      {children}
    </DomainContext.Provider>
  );
}
