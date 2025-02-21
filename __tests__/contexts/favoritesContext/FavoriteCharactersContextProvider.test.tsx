import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FavoriteCharactersContextProvider, {
  FavoriteCharactersContext,
  LOCAL_STORAGE_KEY,
} from "@/contexts/favoritesContext/FavoriteCharactersContextProvider";
import { FC, useContext } from "react";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";
import {
  retrieveFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

jest.mock("../../../src/utils/localStorage", () => ({
  __esModule: true,
  retrieveFromLocalStorage: jest.fn(),
  setToLocalStorage: jest.fn(),
}));

const Character: FC<CharacterLesserFragment> = ({ id, name }) => {
  return <div data-testid={`character-id`}>{`${id}-${name}`}</div>;
};

const FAV_ITEM: CharacterLesserFragment = {
  id: 1,
  name: "Goku",
  image: "/goku.png",
};

const TestConsumer: FC = () => {
  const ctxt = useContext(FavoriteCharactersContext);

  if (!ctxt) {
    return <div data-testid="missing-provider" />;
  }

  const { favList, totalFavs, addFav, removeFav, checkFav } = ctxt;

  const handleAdd = () => addFav(FAV_ITEM);
  const handleRemove = () => removeFav(FAV_ITEM.id);

  return (
    <div>
      <div>
        {favList.map((fav) => (
          <Character key={fav.id} {...fav} />
        ))}
      </div>
      <div data-testid="totalFavs">{totalFavs}</div>
      <div data-testid="checkFav">{checkFav(FAV_ITEM.id).toString()}</div>
      <button data-testid="addFavBtn" onClick={handleAdd}>
        Add Favorite
      </button>
      <button data-testid="removeFavBtn" onClick={handleRemove}>
        Remove Favorite
      </button>
    </div>
  );
};

describe("FavoriteCharactersContextProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize state from localStorage", () => {
    (retrieveFromLocalStorage as jest.Mock).mockReturnValue([
      { id: 10, name: "Piccolo", image: "/piccolo.png" },
    ]);

    render(
      <FavoriteCharactersContextProvider>
        <TestConsumer />
      </FavoriteCharactersContextProvider>
    );

    expect(retrieveFromLocalStorage).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      []
    );
    expect(screen.getByTestId("totalFavs")).toHaveTextContent("1");
    expect(screen.queryAllByTestId("character-id")[0]).toHaveTextContent(
      "10-Piccolo"
    );
  });

  it("removes a favorite correctly", () => {
    (retrieveFromLocalStorage as jest.Mock).mockReturnValue([
      { id: 1, name: "Goku", image: "/goku.png" },
      { id: 2, name: "Vegeta", image: "/vegeta.png" },
    ]);

    render(
      <FavoriteCharactersContextProvider>
        <TestConsumer />
      </FavoriteCharactersContextProvider>
    );

    const removeFavBtn = screen.getByTestId("removeFavBtn");

    fireEvent.click(removeFavBtn);
    expect(screen.queryAllByTestId("character-id").length).toBe(1);
    expect(screen.getByTestId("totalFavs")).toHaveTextContent("1");

    expect(setToLocalStorage).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, [
      { id: 2, name: "Vegeta", image: "/vegeta.png" },
    ]);
  });

  it("adds a favorite correctly and saves it to localStorage", () => {
    (retrieveFromLocalStorage as jest.Mock).mockReturnValue([]);

    render(
      <FavoriteCharactersContextProvider>
        <TestConsumer />
      </FavoriteCharactersContextProvider>
    );

    const addFavBtn = screen.getByTestId("addFavBtn");

    fireEvent.click(addFavBtn);

    const chars = screen.queryAllByTestId("character-id");
    expect(chars.length).toBe(1);
    expect(chars[0]).toHaveTextContent(`${FAV_ITEM.id}-${FAV_ITEM.name}`);
    expect(screen.getByTestId("totalFavs")).toHaveTextContent("1");

    expect(setToLocalStorage).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, [
      { id: 1, name: "Goku", image: "/goku.png" },
    ]);
  });

  it("checks for the existence of a character correctly", () => {
    render(
      <FavoriteCharactersContextProvider>
        <TestConsumer />
      </FavoriteCharactersContextProvider>
    );

    const addFavBtn = screen.getByTestId("addFavBtn");

    fireEvent.click(addFavBtn);

    expect(screen.getByTestId("checkFav")).toHaveTextContent("true");
  });
});
