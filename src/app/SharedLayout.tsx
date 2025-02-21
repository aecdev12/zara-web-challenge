import React, { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import MainSearch from "@/ui/MainSearch/MainSearch";

interface IProps extends PropsWithChildren {
  heading?: string;
}

const SharedLayout: FC<IProps> = ({ children, heading }) => {
  return (
    <article className={styles["main-body"]}>
      {!!heading && <h1>{heading}</h1>}
      <MainSearch />
      <section className={styles["list-section"]}>{children}</section>
    </article>
  );
};

export default SharedLayout;
