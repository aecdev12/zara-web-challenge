"use client";
import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import useHorizontalScroll from "@/hooks/useHorizontalScroll";

interface IProps {
  children: ReactNode[];
}

const Caroussel: FC<IProps> = ({ children }) => {
  const ref = useHorizontalScroll<HTMLUListElement>();
  return (
    <ul ref={ref} className={styles["horizontal-list"]}>
      {children}
    </ul>
  );
};

export default Caroussel;
