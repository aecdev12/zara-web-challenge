import { Affiliation, Gender, Race } from "./enums";

type CommonTypes = {
  id: number;
  name: string;
  image: string;
  deletedAt?: string;
};

export type CharacterLesserFragment = CommonTypes;

export type CharacterFragment = {
  ki: string;
  maxKi: string;
  race: Race;
  gender: Gender;
  description: string;
  affiliation: Affiliation;
} & CharacterLesserFragment;

export type OriginPlanet = {
  isDestroyed: boolean;
  description: string;
} & CommonTypes;

export type Transformation = {
  ki: string;
} & CommonTypes;

export type FullCharacter = CharacterFragment & {
  originPlanet: OriginPlanet;
  transformations: Transformation[];
};
