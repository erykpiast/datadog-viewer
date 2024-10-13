import { createContext, useEffect, useState } from "react";

export const DomainContext = createContext<{
  domain: string | null;
  setDomain: (newDomain: string) => void;
}>({
  domain: null,
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

    chrome.storage.sync.set({ domain });
  }, [domain]);

  useEffect(() => {
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
