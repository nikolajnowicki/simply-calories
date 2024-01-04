import { NavBarButton } from "./NavBarButton";

export const NavBar = () => {
  return (
    <nav>
      <NavBarButton text="Home" href="/"></NavBarButton>
      <NavBarButton text="new" href="/new"></NavBarButton>
    </nav>
  );
};
