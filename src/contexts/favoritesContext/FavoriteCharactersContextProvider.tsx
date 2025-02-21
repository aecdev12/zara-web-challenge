"use client";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import createFavoritesContext from "./favoritesContext";
import {
  retrieveFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export const LOCAL_STORAGE_KEY = "favList";

export const FavoriteCharactersContext =
  createFavoritesContext<CharacterLesserFragment>();

const FavoriteCharactersContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [favList, setFavList] = useState<CharacterLesserFragment[]>(
    retrieveFromLocalStorage<CharacterLesserFragment[]>(LOCAL_STORAGE_KEY, [])
  );

  const addFav = (fav: CharacterLesserFragment) => {
    setFavList((prev) => [...prev, fav]);
  };

  const removeFav = (id: number) => {
    setFavList((prev) => [...prev.filter((v) => v.id !== id)]);
  };

  const checkFav = (id: number) => {
    return favList.some((v) => v.id === id);
  };

  useEffect(() => {
    setToLocalStorage(LOCAL_STORAGE_KEY, favList);
  }, [favList]);

  return (
    <FavoriteCharactersContext.Provider
      value={{
        favList,
        totalFavs: favList.length,
        addFav,
        removeFav,
        checkFav,
      }}
    >
      {children}
    </FavoriteCharactersContext.Provider>
  );
};

export default FavoriteCharactersContextProvider;
