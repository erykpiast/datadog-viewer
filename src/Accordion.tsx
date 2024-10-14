import { type ReactNode } from "react";

import "./Accordion.css";

export function Accordion({
  className,
  children,
  summary,
}: {
  className?: string;
  children: ReactNode;
  summary: string;
}): JSX.Element {
  return (
    <details className={`accordion ${className}`} open>
      <summary>{summary}</summary>
      {children}
    </details>
  );
}
