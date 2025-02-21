import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";
import { FC } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import styles from "./styles.module.scss";

interface IProps {
  list: CharacterLesserFragment[];
}

const CharacterList: FC<IProps> = ({ list }) => {
  return (
    <div className={styles["character-list"]}>
      <p>{list.length} RESULTS</p>
      <ul>
        {list.map((c) => (
          <CharacterCard key={c.id} {...c} />
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
