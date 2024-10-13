import { IconButton } from "./IconButton";

import "./ToggleButton.css";

export function ToggleButton({
  children,
  className,
  id,
  mode = "icon",
  value,
  onToggle,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  mode?: "icon" | "plain";
  value: boolean;
  onToggle: () => void;
}) {
  if (mode === "plain") {
    return (
      <div className={`toggle-button ${className}`}>
        <label htmlFor={id}>{children}</label>
        <input type="checkbox" id={id} checked={value} onChange={onToggle} />
      </div>
    );
  }

  if (mode === "icon") {
    return (
      <IconButton
        className={`toggle-icon-button ${className}`}
        id={id}
        inputProps={{ checked: value, onChange: onToggle }}
        mode="checkbox"
      >
        {children}
      </IconButton>
    );
  }
}
