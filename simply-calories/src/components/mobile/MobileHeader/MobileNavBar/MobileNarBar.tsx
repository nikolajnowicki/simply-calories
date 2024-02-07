"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { useSession } from "next-auth/react";
import { MobileLogo } from "../../MobileLogo/MobileLogo";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import LoginModal from "@/components/shared/modals/Login/LoginModal";
import RegisterModal from "@/components/shared/modals/Register/RegisterModal";
import { RegisterButton } from "@/components/desktop/NavBar/RegisterButton";
import { LogInButton } from "@/components/desktop/NavBar/LoginButton";
import { signOut } from "next-auth/react";

const publicMenuItems = [
  { text: "Home", href: "/" },
  { text: "BMR Calc", href: "/bmr-calc" },
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
  { text: "Recipes", href: "/recipes" },
];

const privateMenuItems = [
  ...publicMenuItems,
  { text: "My Recipes", href: "/recipes/my-recipes" },
  { text: "Profile", href: "/profile" },
  { text: "Calories", href: "/profile/calories" },
];

const MobileNavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    isOpen: isLoginOpen,
    openModal: openLogin,
    closeModal: closeLogin,
  } = useModal();
  const {
    isOpen: isRegisterOpen,
    openModal: openRegister,
    closeModal: closeRegister,
  } = useModal();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  const menuItems = session ? privateMenuItems : publicMenuItems;

  return (
    <>
      <div className="flex items-center justify-between w-full relative pr-4 shadow-md text-LightTextCol/90 bg-LightUiCol dark:text-DarkTextCol/90 dark:bg-DarkUiCol">
        <MobileLogo />

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
            {session && (
              <div
                className="p-4 text-gray-700 hover:bg-gray-100 dark:text-DarkTextCol dark:hover:text-DarkTextCol2 dark:hover:bg-transparent cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </div>
          {!session && (
            <div className="fixed bottom-0 left-0 right-0 z-40 p-4 flex flex-col justify-center items-center gap-4 bg-LightUiCol dark:bg-DarkUiCol">
              <RegisterButton text="Register" onClick={openRegister} />
              <LogInButton text="Login" onClick={openLogin} />
            </div>
          )}
          <div className="flex justify-center items-center mt-8">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </>
  );
};

export default MobileNavBar;
