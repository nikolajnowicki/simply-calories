import MobileNavBar from "./MobileNavBar/MobileNarBar";

export const MobileHeader = () => {
  return (
    <header className="flex justify-between items-center rounded-md w-full pb-4">
      <MobileNavBar />
    </header>
  );
};
