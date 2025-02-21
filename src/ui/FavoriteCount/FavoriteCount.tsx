"use client";
import FillHeartIcon from "@/assets/icons/FillHeartIcon";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Route } from "@/lib/enums";

const FavoriteCount: FC = () => {
  const { totalFavs } = useFavoriteCharactersContext();
  return (
    <Link href={Route.FAVORITES} className={styles["fav-count"]}>
      <FillHeartIcon />
      {totalFavs}
    </Link>
  );
};

export default FavoriteCount;
