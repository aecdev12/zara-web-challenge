"use client";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./styles.module.scss";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={styles["btn"]} {...props}>
      {children}
    </button>
  );
};

export default Button;
