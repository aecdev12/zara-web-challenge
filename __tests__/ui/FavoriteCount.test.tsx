import { Route } from "@/lib/enums";
import FavoriteCount from "@/ui/FavoriteCount/FavoriteCount";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("../../src/assets/icons/FillHeartIcon", () => {
  return jest.fn(() => <div data-testid="fill-heart-icon" />);
});

jest.mock("../../src/hooks/useFavoriteCharactersContext", () =>
  jest.fn().mockReturnValue({ totalFavs: 10 })
);

describe("FavoriteCount component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a link to /favorites", () => {
    render(<FavoriteCount />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", Route.FAVORITES);
  });

  it("should render the FillHeartIcon", () => {
    render(<FavoriteCount />);
    expect(screen.getByTestId("fill-heart-icon")).toBeInTheDocument();
  });

  it("should display the total favorite count from context", () => {
    render(<FavoriteCount />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
