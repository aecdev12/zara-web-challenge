import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import FavoriteButton from "@/ui/FavoriteButton/FavoriteButton";
import { CharacterLesserFragment } from "@/api/dragonBall/schema/types";

jest.mock("../../src/assets/icons/FillHeartIcon", () => {
  return jest.fn(() => <div data-testid="fill-heart-icon" />);
});
jest.mock("../../src/assets/icons/HeartIcon", () => {
  return jest.fn(() => <div data-testid="heart-icon" />);
});

jest.mock("../../src/hooks/useFavoriteCharactersContext");

describe("FavoriteButton component", () => {
  const mockAddFav = jest.fn();
  const mockRemoveFav = jest.fn();
  const mockCheckFav = jest.fn();

  (useFavoriteCharactersContext as jest.Mock).mockReturnValue({
    addFav: mockAddFav,
    removeFav: mockRemoveFav,
    checkFav: mockCheckFav,
  });

  const testProps: CharacterLesserFragment = {
    id: 123,
    name: "Test Character",
    image: "/test.png",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render HeartIcon when the character is not a favorite (isFav=false)", () => {
    mockCheckFav.mockReturnValue(false);

    render(<FavoriteButton {...testProps} />);

    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();

    expect(screen.queryByTestId("fill-heart-icon")).toBeNull();

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("fav");
  });

  it("should render FillHeartIcon when the character is a favorite (isFav=true)", () => {
    mockCheckFav.mockReturnValue(true);

    render(<FavoriteButton {...testProps} />);

    expect(screen.getByTestId("fill-heart-icon")).toBeInTheDocument();

    expect(screen.queryByTestId("heart-icon")).toBeNull();

    const button = screen.getByRole("button");
    expect(button).toHaveClass("fav");
  });

  it("should call addFav when the character is not a favorite and button is clicked", () => {
    mockCheckFav.mockReturnValue(false);

    render(<FavoriteButton {...testProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAddFav).toHaveBeenCalledWith(testProps);
    expect(mockRemoveFav).not.toHaveBeenCalled();
  });

  it("should call removeFav when the character is a favorite and button is clicked", () => {
    mockCheckFav.mockReturnValue(true);

    render(<FavoriteButton {...testProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRemoveFav).toHaveBeenCalledWith(testProps.id);
    expect(mockAddFav).not.toHaveBeenCalled();
  });
});
