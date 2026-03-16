"use client";

interface Tab {
  id: string;
  label: string;
}

interface ZoneTabsProps {
  tabs: Tab[];
  activeTab: string;
  onSelect: (id: string) => void;
}

export default function ZoneTabs({ tabs, activeTab, onSelect }: ZoneTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 py-3 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-accent text-white"
                  : "bg-surface text-textSecondary hover:text-textPrimary hover:bg-surfaceHigh border border-border"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
