import { FC, InputHTMLAttributes, ReactNode } from "react";
import { InputIconPosition } from "./enums";
import styles from "./styles.module.scss";

type InputIcon = {
  src: ReactNode;
  position: InputIconPosition;
};

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: InputIcon;
}

const TextInput: FC<IProps> = ({ icon, ...props }) => {
  return (
    <label className={`${styles["text-input"]} ${props.className}`}>
      {!!icon && icon.position === InputIconPosition.LEFT && icon.src}
      <input {...props} className="" />
      {!!icon && icon.position === InputIconPosition.RIGHT && icon.src}
    </label>
  );
};

export default TextInput;
