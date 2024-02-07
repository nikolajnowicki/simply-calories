"use client";
import { SearchBar } from "@/components/shared/uiElements/searchBar/SearchBar";
import MobileNavBar from "./MobileNavBar/MobileNarBar";

const handleSearch = async (query: string) => {};

export const MobileHeader = () => {
  return (
    <header className="flex flex-col items-center rounded-md w-full pb-4">
      <MobileNavBar />
      <SearchBar onSubmit={handleSearch}></SearchBar>
    </header>
  );
};
