import { URLParameters } from "@/lib/types";
import FavoriteList from "@/ui/FavoriteList/FavoriteList";
import React, { FC } from "react";

const FavoritesPage: FC = async (props: {
  searchParams?: Promise<URLParameters>;
}) => {
  const searchParams = await props.searchParams;
  const wordsToMatch = searchParams?.keywords;

  return <FavoriteList filters={{ name: wordsToMatch }} />;
};

export default FavoritesPage;
