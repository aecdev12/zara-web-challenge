import { FavoriteCharactersContext } from "@/contexts/favoritesContext/FavoriteCharactersContextProvider";
import { useContext } from "react";

const useFavoriteCharactersContext = () => {
  const favContext = useContext(FavoriteCharactersContext);

  if (!favContext) {
    throw new Error("useFavoriteCharactersContext called outside its provider");
  }

  return favContext;
};

export default useFavoriteCharactersContext;
