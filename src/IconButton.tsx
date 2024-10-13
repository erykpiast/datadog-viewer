import "./IconButton.css";

export function IconButton(props: {
  children: React.ReactNode;
  className?: string;
  mode: "button";
  onClick: () => void;
}): JSX.Element;
export function IconButton(props: {
  children: React.ReactNode;
  className?: string;
  id: string;
  mode: "checkbox";
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}): JSX.Element;
export function IconButton({
  children,
  className,
  id,
  inputProps,
  mode,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  mode: "button" | "checkbox";
  onClick?: () => void;
}) {
  if (mode === "checkbox") {
    return (
      <div className={`icon-button ${className}`}>
        <label htmlFor={id}>{children}</label>
        <input type="checkbox" id={id} {...inputProps} />
      </div>
    );
  }

  if (mode === "button") {
    return (
      <button className={`icon-button ${className}`} onClick={onClick}>
        <span>{children}</span>
      </button>
    );
  }
}
