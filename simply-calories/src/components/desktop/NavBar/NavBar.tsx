"use client";

import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";
import { NavBarButtonDropdown } from "./NavBarButtonDropDown";
import { useModal } from "@/hooks/useModal";
import { useSession, signOut } from "next-auth/react";
import LoginModal from "@/components/shared/modals/Login/LoginModal";
import RegisterModal from "@/components/shared/modals/Register/RegisterModal";
import { LogInButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";
import { LogOutButton } from "./LogOutButton";

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

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 shadow-lg rounded-xl bg-LightUiCol dark:bg-DarkUiCol">
      <ul className="flex">
        <NavBarButton text="Home" href="/" />
        <NavBarButton text="BMR Calculator" href="/bmr-calc" />
        <NavBarButtonDropdown text="Trackers" dropdownItems={TrackersItems} />
        <NavBarButtonDropdown text="Recipes" dropdownItems={RecipesItems} />
      </ul>

      <div className="flex items-center h-full">
        {session ? (
          <>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <LogOutButton text="Logout" onClick={handleLogout}></LogOutButton>
            <p>Signed in as {session.user?.email}</p>
          </>
        ) : (
          <>
            <RegisterButton
              text="Register"
              onClick={openRegister}
            ></RegisterButton>
            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={closeRegister}
            ></RegisterModal>
            <LogInButton text="Login" onClick={openLogin}></LogInButton>
            <LoginModal isOpen={isLoginOpen} onClose={closeLogin}></LoginModal>
          </>
        )}

        <ThemeSwitcher />
      </div>
    </nav>
  );
};
