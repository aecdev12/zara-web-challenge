import createFavoritesContext from "@/contexts/favoritesContext/favoritesContext";
import "@testing-library/jest-dom";
import { createContext } from "react";

jest.mock("react", () => ({
  createContext: jest.fn(),
}));

describe("createFavoritesContext", () => {
  const createContextMock = createContext as jest.Mock;

  it("creates the context with undefined initial value", () => {
    createFavoritesContext();
    expect(createContextMock).toHaveBeenCalledWith(undefined);
  });
});
