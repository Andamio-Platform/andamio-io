export default function Tabs({
  tabs,
  current,
  onChange,
}: {
  tabs: { name: string; value: string }[];
  current: string;
  onChange: (tabValue: string) => void;
}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.value}
              className={classNames(
                tab.value == current
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "group inline-flex cursor-pointer items-center border-b-2 px-1 py-4 text-sm font-medium",
              )}
              aria-current={tab.value == current ? "page" : undefined}
              onClick={() => onChange(tab.value)}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
