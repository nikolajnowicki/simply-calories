"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MobileLogo } from "../../MobileLogo/MobileLogo";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

const menuItems = [
  { text: "Home", href: "/" },
  { text: "BMR Calc", href: "/bmr-calc" },
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
  { text: "Recipes", href: "/recipes" },
  { text: "My Recipes", href: "/recipes/my-recipes" },
];

const MobileNavBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-between w-full relative pr-4 shadow-md text-LightTextCol/90 bg-LightUiCol dark:text-DarkTextCol/90  dark:bg-DarkUiCol">
      <MobileLogo></MobileLogo>

      <div
        className={`tham tham-e-squeeze tham-w-8 ${
          isActive ? "tham-active" : ""
        } z-30`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="tham-box">
          <div className="tham-inner bg-LightTextCol dark:bg-DarkTextCol" />
        </div>
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ${
          isActive ? "translate-x-0" : "translate-x-full"
        } z-10 bg-LightUiCol text-LightTextCol shadow-lg dark:bg-DarkUiCol dark:text-DarkTextCol w-2/5`}
      >
        <div className="mt-16">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <div className="p-4 text-gray-700 hover:bg-gray-100 dark:text-DarkTextCol dark:hover:text-DarkTextCol2 dark:hover:bg-transparent cursor-pointer">
                {item.text}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
