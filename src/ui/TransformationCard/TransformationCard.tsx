import { Transformation } from "@/api/dragonBall/schema/types";
import Image from "next/image";
import React, { FC } from "react";
import styles from "./styles.module.scss";

const TransformationCard: FC<Transformation> = ({ id, image, name, ki }) => {
  return (
    <li className={styles["card-wrapper"]}>
      <div className={styles["img"]}>
        <Image src={image} alt={`transformation-${id}`} fill sizes="100%" />
      </div>
      <div className={styles["content"]}>
        <label>{name}</label>
        <span>{ki} ki</span>
      </div>
    </li>
  );
};

export default TransformationCard;
