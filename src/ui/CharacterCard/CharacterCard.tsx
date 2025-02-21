import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";
import { Route } from "@/lib/enums";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import styles from "./styles.module.scss";

const CharacterCard: FC<CharacterLesserFragment> = (props) => {
  const { id, name, image } = props;
  return (
    <li>
      <Link
        className={styles["character-card"]}
        href={`${Route.CHARACTERS}/${id}`}
      >
        <div className={styles["image-wrapper"]}>
          <Image
            src={image}
            alt={`${name} avatar`}
            fill
            sizes="100%"
            priority
          />
        </div>
        <div className={styles["footer"]}>
          <p>{name}</p>
          <FavoriteButton {...props} />
        </div>
      </Link>
    </li>
  );
};

export default CharacterCard;
