import MockFavoriteCharactersContextProvider, {
  MockFavoriteCharactersContext,
} from "@/contexts/favoritesContext/__mocks__/FavoriteCharactersContextProvider";
import useFavoriteCharactersContext from "@/hooks/useFavoriteCharactersContext";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";

jest.mock(
  "../../src/contexts/favoritesContext/FavoriteCharactersContextProvider",
  () => ({
    default: MockFavoriteCharactersContextProvider,
    FavoriteCharactersContext: MockFavoriteCharactersContext,
  })
);

describe("useFavoriteCharactersContext", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    (console.error as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("throws an error if used outside its provider", () => {
    expect(() => {
      renderHook(() => useFavoriteCharactersContext());
    }).toThrow("useFavoriteCharactersContext called outside its provider");
  });

  it("returns the context value when used inside the provider", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MockFavoriteCharactersContextProvider>
        {children}
      </MockFavoriteCharactersContextProvider>
    );

    expect(() => {
      renderHook(() => useFavoriteCharactersContext(), {
        wrapper,
      });
    }).not.toThrow();

    const { result } = renderHook(() => useFavoriteCharactersContext(), {
      wrapper,
    });

    expect(result.current).toBe("test-value");
  });
});
