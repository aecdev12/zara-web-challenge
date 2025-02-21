import { getAllCharacters, getCharacter } from "@/api/dragonBall/apiService";
import Caroussel from "@/ui/Caroussel/Caroussel";
import TransformationCard from "@/ui/TransformationCard/TransformationCard";
import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.scss";
import FavoriteButton from "@/ui/FavoriteButton/FavoriteButton";
import { CHARACTERS_LIMIT } from "@/lib/constants";
import { CharacterFragment } from "@/api/dragonBall/schema/types";

export async function generateStaticParams() {
  try {
    const characters = await getAllCharacters({ limit: CHARACTERS_LIMIT });

    let list: CharacterFragment[];

    if (Array.isArray(characters)) {
      list = characters;
    } else {
      list = characters.items;
    }

    return list.map((character) => ({
      id: character.id.toString(),
    }));
  } catch {
    return [];
  }
}

const CharacterPage: FC<{
  params: Promise<{ id: string }>;
}> = async (props) => {
  const { id } = await props.params;
  const character = await getCharacter(Number(id));

  return (
    <article className={styles["main-body"]}>
      <section className={styles["hero"]}>
        <div className={styles["content"]}>
          <div className={styles["img"]}>
            <Image
              src={character.image}
              alt={`${id}-character-image`}
              fill
              sizes="100%"
            />
          </div>
          <div className={styles["name-desc"]}>
            <div className={styles["heading"]}>
              <h1>{character.name}</h1>
              <FavoriteButton {...character} />
            </div>
            <p>{character.description}</p>
          </div>
        </div>
      </section>
      <section className={styles["caroussel"]}>
        <h2>Transformations</h2>
        {!character.transformations.length && (
          <p>{"This character doesn't have any transformations."}</p>
        )}
        <Caroussel>
          {character.transformations.map((transformation) => (
            <TransformationCard key={transformation.id} {...transformation} />
          ))}
        </Caroussel>
      </section>
    </article>
  );
};

export default CharacterPage;
