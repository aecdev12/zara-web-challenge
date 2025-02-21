"use client";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";
import FillHeartIcon from "@/assets/icons/FillHeartIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import { FC, MouseEventHandler } from "react";
import styles from "./styles.module.scss";

const FavoriteButton: FC<CharacterLesserFragment> = (props) => {
  const { checkFav, addFav, removeFav } = useFavoriteCharactersContext();

  const isFav = checkFav(props.id);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!isFav) addFav(props);
    else removeFav(props.id);
  };

  return (
    <button
      onClick={onClick}
      className={`${styles["fav-button"]} ${isFav ? styles["fav"] : ""}`}
    >
      {isFav ? <FillHeartIcon /> : <HeartIcon />}
    </button>
  );
};

export default FavoriteButton;
