"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Separator from "@/components/shared/uiElements/seperator/Seperator";
import MyRecipeTab from "./MyRecipeTab";
import RecipeMaker from "./RecipeMaker";

const MyRecipes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Create Recipe");
  const { data: session, status } = useSession();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabContents: Record<string, JSX.Element | JSX.Element[]> = {
    "Create Recipe": <RecipeMaker />,
    "My Recipes": <MyRecipeTab />,
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-grow bg-#6082B6 rounded-md w-full pb-0 sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="flex flex-col items-center w-full h-auto rounded-t-xl shadow-xl bg-LightUiCol2 dark:bg-DarkUiCol/60">
          {session ? (
            <>
              <Separator
                tabs={["Create Recipe", "My Recipes"]}
                defaultTab="Create Recipe"
                onTabChange={handleTabChange}
              />
              {tabContents[activeTab]}
            </>
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <p className="text-2xl font-semibold">
                Please log in to view this content.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyRecipes;
