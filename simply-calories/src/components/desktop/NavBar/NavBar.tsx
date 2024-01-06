import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";
import { NavBarButtonDropdown } from "./NavBarButtonDropDown";

const dropdownItems = [
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
];

export const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 shadow-lg bg-DarkUiCol">
      <ul className="flex">
        <NavBarButton text="Home" href="/" />
        <NavBarButton text="BMR Calculator" href="/bmr-calc" />
        <NavBarButtonDropdown text="Trackers" dropdownItems={dropdownItems} />
        <NavBarButton text="Recipes" href="/recipes" />
      </ul>

      <div className="flex">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
