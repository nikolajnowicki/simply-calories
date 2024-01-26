"use client";

import React, { createContext, useState, useContext } from "react";
import { ApiResponse } from "../../models/ApiResponse";

interface SearchResultsContextType {
  results: ApiResponse | null;
  setResults: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
}

const SearchResultsContext = createContext<SearchResultsContextType | null>(
  null
);

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error(
      "useSearchResults must be used within a SearchResultsProvider"
    );
  }
  return context;
};

export const SearchResultsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [results, setResults] = useState<ApiResponse | null>(null);

  return (
    <SearchResultsContext.Provider value={{ results, setResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
