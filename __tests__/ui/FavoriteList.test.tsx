import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import { GetAllCharactersParams } from "@/api/dragonBall/apiService";
import FavoriteList from "@/ui/FavoriteList/FavoriteList";
import CharacterList from "@/ui/CharacterList/CharacterList";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";

jest.mock("../../src/hooks/useFavoriteCharactersContext", () => jest.fn());

jest.mock("../../src/ui/CharacterList/CharacterList", () => {
  return jest.fn(() => <div data-testid="mock-character-list">MockedList</div>);
});

describe("FavoriteList component", () => {
  const mockFavList: CharacterLesserFragment[] = [
    { id: 1, name: "Goku", image: "/goku.png" },
    { id: 2, name: "Vegeta", image: "/vegeta.png" },
    { id: 3, name: "Gohan", image: "/gohan.png" },
    { id: 4, name: "Trunks", image: "/trunks.png" },
  ];

  (useFavoriteCharactersContext as jest.Mock).mockReturnValue({
    favList: mockFavList,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render CharacterList with the full favorite list when no filters are provided", () => {
    render(<FavoriteList />);

    expect(CharacterList).toHaveBeenCalledWith(
      { list: mockFavList },
      undefined
    );

    expect(screen.getByTestId("mock-character-list")).toBeInTheDocument();
  });

  it("should filter the favorite list by name (case-insensitive) when a filter is provided", () => {
    const NAME: string = "go";
    render(<FavoriteList filters={{ name: NAME }} />);

    const expectedFiltered = mockFavList.filter((c) =>
      c.name.toLowerCase().includes(NAME.toLowerCase(), -1)
    );

    expect(CharacterList).toHaveBeenCalledWith(
      { list: expectedFiltered },
      undefined
    );
  });

  it("should handle an empty filter string and return the entire favList", () => {
    const filters: GetAllCharactersParams = { name: "" };
    render(<FavoriteList filters={filters} />);

    expect(CharacterList).toHaveBeenCalledWith(
      { list: mockFavList },
      undefined
    );
  });
});
