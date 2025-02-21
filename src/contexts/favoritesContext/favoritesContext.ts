import { createContext } from "react";

type TAddFav<T> = (fav: T) => void;
type TRemoveFav = (id: number) => void;
type TCheckFav = (id: number) => boolean;

interface IFavoritesContext<T = unknown> {
  totalFavs: number;
  favList: T[];
  addFav: TAddFav<T>;
  removeFav: TRemoveFav;
  checkFav: TCheckFav;
}

const createFavoritesContext = <T>() =>
  createContext<IFavoritesContext<T> | undefined>(undefined);

export default createFavoritesContext;
