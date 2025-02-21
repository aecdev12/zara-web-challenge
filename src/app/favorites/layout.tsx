import { FC, PropsWithChildren } from "react";
import SharedLayout from "../SharedLayout";

const FavoritesLayout: FC<PropsWithChildren> = ({ children }) => {
  return <SharedLayout heading="Favorites">{children}</SharedLayout>;
};

export default FavoritesLayout;
