import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { NavBarButton } from "./NavBarButton";
import { NavBarButtonDropdown } from "./NavBarButtonDropDown";
import { LogInButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";

const TrackersItems = [
  { text: "Calorie Tracker", href: "/calorie-tracker" },
  { text: "Fasting Tracker", href: "/fasting-tracker" },
];

const RecipesItems = [
  { text: "Find Recipes", href: "/recipes" },
  { text: "My Recipes", href: "/recipes/my-recipes" },
];

export const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center  w-full h-16 shadow-lg rounded-xl bg-LightUiCol dark:bg-DarkUiCol">
      <ul className="flex">
        <NavBarButton text="Home" href="/" />
        <NavBarButton text="BMR Calculator" href="/bmr-calc" />
        <NavBarButtonDropdown text="Trackers" dropdownItems={TrackersItems} />
        <NavBarButtonDropdown text="Recipes" dropdownItems={RecipesItems} />
      </ul>

      <div className="flex items-center h-full">
        <RegisterButton text="Register" href="/register"></RegisterButton>
        <LogInButton text="Login" href="/login"></LogInButton>

        <ThemeSwitcher />
      </div>
    </nav>
  );
};
