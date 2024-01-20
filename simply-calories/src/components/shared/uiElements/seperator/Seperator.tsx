import React, { useState } from "react";

interface SeparatorProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange: (tab: string) => void;
}

const Separator: React.FC<SeparatorProps> = ({
  tabs,
  defaultTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex items-center space-x-4 pt-8 pb-4 text-sm md:text-lg text-LightTextCols dark:text-DarkTextCol">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          {index > 0 && <span className="text-gray-400">|</span>}{" "}
          <button
            className={`cursor-pointer ${
              activeTab === tab
                ? "font-bold border-b-2 border-gray-500 dark:border-DarkTextCol2"
                : ""
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Separator;
