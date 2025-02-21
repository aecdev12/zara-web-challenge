import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

interface IProps {
  message?: string;
  action?: {
    onClick: VoidFunction;
    label: string;
  };
}

const ErrorDisplay: FC<IProps> = ({
  message = DEFAULT_ERROR_MESSAGE,
  action,
}) => {
  return (
    <div className={styles["error-display"]}>
      {message}
      {action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
    </div>
  );
};

export default ErrorDisplay;
