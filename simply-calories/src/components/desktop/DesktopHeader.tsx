import ThemeSwitch from "../shared/ThemeToggle";
import { NavBar } from "./NavBar/NavBar";

export const Header = () => {
  return (
    <header>
      <h1>Header working</h1>
      <ThemeSwitch></ThemeSwitch>
      <NavBar></NavBar>
    </header>
  );
};
