import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";
import { NavBarButtonDropdown } from "./NavBarButtonDropDown";
import { LogInButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";

const dropdownItems = [
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
];

export const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 shadow-lg rounded-xl bg-DarkUiCol">
      <ul className="flex">
        <NavBarButton text="Home" href="/" />
        <NavBarButton text="BMR Calculator" href="/bmr-calc" />
        <NavBarButtonDropdown text="Trackers" dropdownItems={dropdownItems} />
        <NavBarButton text="Recipes" href="/recipes" />
      </ul>

      <div className="flex items-center h-full">
        {/* <NavBarButton text="Register" href="/register" />
        <NavBarButton text="Login" href="/login" /> */}
        <RegisterButton text="Register" href="/register"></RegisterButton>
        <LogInButton text="Login" href="/login"></LogInButton>

        <ThemeSwitcher />
      </div>
    </nav>
  );
};
