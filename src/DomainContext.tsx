import { createContext } from "react";
import { usePersistentSetting } from "./usePersistentSetting";

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
  const [domain, setDomain] = usePersistentSetting<string | null>(
    "domain",
    null
  );

  return (
    <DomainContext.Provider value={{ domain, setDomain }}>
      {children}
    </DomainContext.Provider>
  );
}
