import { DesktopLogo } from "./NavBar/DesktopLogo";
import { NavBar } from "./NavBar/NavBar";

export const Header = () => {
  return (
    <header className="bg-#6082B6 rounded-md w-full pb-4  sm:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <div className="flex justify-center items-center w-full">
        <DesktopLogo></DesktopLogo>
      </div>
      <NavBar></NavBar>
    </header>
  );
};
