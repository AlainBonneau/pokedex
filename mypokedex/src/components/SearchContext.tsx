// SearchContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
