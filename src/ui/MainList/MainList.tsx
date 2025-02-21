import {
  getAllCharacters,
  GetAllCharactersParams,
} from "@/api/dragonBall/apiService";
import {
  CharacterFragment,
  CharacterLesserFragment,
} from "@/api/dragonBall/schema/types";
import purgeUndefinedValueFromObject from "@/utils/purgeUndefinedValuesFromObject";
import React, { FC } from "react";
import CharacterList from "../CharacterList/CharacterList";

interface IProps {
  filters?: GetAllCharactersParams;
}

const MainList: FC<IProps> = async ({ filters }) => {
  const params: GetAllCharactersParams = { ...filters };

  const characters = await getAllCharacters(
    purgeUndefinedValueFromObject(params)
  );

  let list: CharacterFragment[];

  if (Array.isArray(characters)) {
    list = characters;
  } else {
    list = characters.items;
  }

  const purgedList = list.map((c): CharacterLesserFragment => {
    const { id, name, image }: CharacterLesserFragment = c;
    return {
      id,
      name,
      image,
    };
  });

  return <CharacterList list={purgedList} />;
};

export default MainList;
