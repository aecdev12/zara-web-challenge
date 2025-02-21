import React, { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import FavoriteCount from "../FavoriteCount/FavoriteCount";
import { Route } from "@/lib/enums";

export const LOGO_PATH = "/marvel-logo.svg";
export const LOGO_ALT = "marvel-logo";
export const LOGO_DIMENSIONS: { height: number; width: number } = {
  height: 52,
  width: 130,
};

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link href={Route.HOME} style={{ ...LOGO_DIMENSIONS }}>
        <Image
          {...LOGO_DIMENSIONS}
          src={LOGO_PATH}
          alt={LOGO_ALT}
          priority={true}
        />
      </Link>
      <FavoriteCount />
    </header>
  );
};

export default Header;
