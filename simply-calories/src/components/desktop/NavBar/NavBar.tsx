"use client";

import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";
import { NavBarButtonDropdown } from "./NavBarButtonDropDown";
import { LogInButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";
import { useModal } from "@/hooks/useModal";
import LoginModal from "@/components/shared/modals/Login/LoginModal";
import RegisterModal from "@/components/shared/modals/Register/RegisterModal";

const TrackersItems = [
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
];

const RecipesItems = [
  { text: "Find Recipes", href: "/recipes" },
  { text: "My Recipes", href: "/recipes/my-recipes" },
];

export const NavBar = () => {
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

  return (
    <nav className="flex flex-row justify-between items-center  w-full h-16 shadow-lg rounded-xl bg-LightUiCol dark:bg-DarkUiCol">
      <ul className="flex">
        <NavBarButton text="Home" href="/" />
        <NavBarButton text="BMR Calculator" href="/bmr-calc" />
        <NavBarButtonDropdown text="Trackers" dropdownItems={TrackersItems} />
        <NavBarButtonDropdown text="Recipes" dropdownItems={RecipesItems} />
      </ul>

      <div className="flex items-center h-full">
        <RegisterButton text="Register" onClick={openRegister}></RegisterButton>
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeRegister}
        ></RegisterModal>
        <LogInButton text="Login" onClick={openLogin}></LogInButton>
        <LoginModal isOpen={isLoginOpen} onClose={closeLogin}></LoginModal>

        <ThemeSwitcher />
      </div>
    </nav>
  );
};
