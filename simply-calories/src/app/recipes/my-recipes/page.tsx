"use client";
import React, { useState } from "react";
import Separator from "@/components/shared/uiElements/seperator/Seperator";
import InformationTab from "./RecipeInfoTab";
import RecipeMaker from "./RecipeMaker";

const MyRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Create Recipe");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabContents: Record<string, JSX.Element | JSX.Element[]> = {
    "Create Recipe": <RecipeMaker />,
    Information: <InformationTab />,
  };

  return (
    <>
      <div className="flex flex-grow bg-#6082B6 rounded-md w-full  pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex flex-col  items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
          <Separator
            tabs={["Create Recipe", "Information"]}
            defaultTab="Create Recipe"
            onTabChange={handleTabChange}
          />
          {tabContents[activeTab]}
        </div>
      </div>
    </>
  );
};

export default MyRecipes;
