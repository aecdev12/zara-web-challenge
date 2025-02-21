"use client";
import { DEBOUNCE_MS } from "@/lib/constants";
import { URLParameters } from "@/lib/types";
import { FC, memo } from "react";
import InputWithURLState from "../InputWithURLState/InputWithURLState";
import TextInput from "../TextInput/TextInput";
import SearchIcon from "@/assets/icons/SearchIcon";
import styles from "./styles.module.scss";
import { InputIconPosition } from "../TextInput/enums";

const MainSearch: FC = () => {
  return (
    <>
      <InputWithURLState<URLParameters>
        parameterKey={"keywords"}
        debounceMs={DEBOUNCE_MS}
        render={(updateUrlParameters, defaultValue) => (
          <TextInput
            type="search"
            role="search"
            defaultValue={defaultValue}
            className={styles["main-search-input"]}
            icon={{
              src: <SearchIcon />,
              position: InputIconPosition.LEFT,
            }}
            placeholder="Search a character..."
            onChange={(e) => updateUrlParameters(e.target.value)}
          />
        )}
      />
    </>
  );
};

export default memo(MainSearch);
