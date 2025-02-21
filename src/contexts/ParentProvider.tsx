"use client";
import React, { FC, PropsWithChildren } from "react";
import FavoriteCharactersContextProvider from "./favoritesContext/FavoriteCharactersContextProvider";

const ParentProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FavoriteCharactersContextProvider>
      {children}
    </FavoriteCharactersContextProvider>
  );
};

export default ParentProvider;
