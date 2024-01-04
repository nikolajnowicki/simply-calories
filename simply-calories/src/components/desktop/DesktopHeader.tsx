import { NavBar } from "./NavBar/NavBar";

export const Header = () => {
  return (
    <header className="bg-#6082B6 rounded-md w-full  sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <h1>Header working</h1>
      <NavBar></NavBar>
    </header>
  );
};
