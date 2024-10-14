import "./Tabs.css";

export function Tabs<TTabId extends string>({
  onTabChange,
  seletedTabId,
  tabs,
}: {
  onTabChange: (tabId: TTabId) => void;
  seletedTabId: TTabId;
  tabs: Array<{ id: TTabId; label: string }>;
}): JSX.Element {
  return (
    <form className="tabs">
      <ul>
        {tabs.map(({ id, label }) => (
          <li>
            <input
              checked={seletedTabId === id}
              id={`${id}-tab`}
              name="tab"
              onChange={({ target: { checked } }) => {
                if (checked) {
                  onTabChange(id);
                }
              }}
              type="radio"
              value={id}
            />
            <label htmlFor={`${id}-tab`} tabIndex={0}>
              {label}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
}
