import apiClient from "../client";
import { Endpoint } from "./endpoints";
import { Affiliation, Gender, Race } from "./schema/enums";
import { CharacterFragment, FullCharacter } from "./schema/types";

export type GetAllCharactersParams = Partial<{
  page: number;
  limit: number;
  name: string;
  gender: Gender;
  race: Race;
  affiliation: Affiliation;
}>;

export type GetAllCharactersResponse =
  | {
      items: CharacterFragment[];
    }
  | CharacterFragment[];

export const getAllCharacters = (
  params?: GetAllCharactersParams
): Promise<GetAllCharactersResponse> => {
  return apiClient.fetch<GetAllCharactersResponse, GetAllCharactersParams>(
    Endpoint.CHARACTERS,
    params
  );
};

export const getCharacter = (id: number): Promise<FullCharacter> => {
  return apiClient.fetch<FullCharacter, never>(`${Endpoint.CHARACTERS}/${id}`);
};
