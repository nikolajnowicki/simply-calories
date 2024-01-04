import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";

export const NavBar = () => {
  return (
    <nav>
      <NavBarButton text="Home" href="/"></NavBarButton>
      <NavBarButton text="BMR Calculator" href="/bmr-calc"></NavBarButton>
      <NavBarButton text="Trackers" href="/calorie-tracker"></NavBarButton>
      <NavBarButton text="Recipes" href="/recipes"></NavBarButton>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  );
};
