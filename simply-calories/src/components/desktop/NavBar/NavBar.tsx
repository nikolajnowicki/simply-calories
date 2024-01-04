import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";

export const NavBar = () => {
  return (
    <nav className="flex flex-row justify-left items-center w-full justify-between bg-DarkUiCol">
      <div className="">
        <NavBarButton text="Home" href="/"></NavBarButton>
        <NavBarButton text="BMR Calculator" href="/bmr-calc"></NavBarButton>
        <NavBarButton text="Trackers" href="/calorie-tracker"></NavBarButton>
        <NavBarButton text="Recipes" href="/recipes"></NavBarButton>
      </div>

      <div className="flex justify-right">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </nav>
  );
};
