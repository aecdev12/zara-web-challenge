"use client";
import { GetAllCharactersParams } from "@/api/dragonBall/apiService";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import React, { FC, useMemo } from "react";
import CharacterList from "../CharacterList/CharacterList";

interface IProps {
  filters?: GetAllCharactersParams;
}

const FavoriteList: FC<IProps> = ({ filters }) => {
  const { favList } = useFavoriteCharactersContext();

  const filteredList = useMemo(() => {
    return favList.filter((v) =>
      v.name.toLowerCase().includes(filters?.name?.toLowerCase() || "", -1)
    );
  }, [filters, favList]);

  return <CharacterList list={filteredList} />;
};

export default FavoriteList;
