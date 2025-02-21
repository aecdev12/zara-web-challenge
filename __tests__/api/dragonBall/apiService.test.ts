import apiClient from "@/api/client";
import {
  getAllCharacters,
  GetAllCharactersParams,
  getCharacter,
} from "@/api/dragonBall/apiService";
import { Endpoint } from "@/api/dragonBall/endpoints";
import "@testing-library/jest-dom";

jest.mock("../../../src/api/client", () => ({
  __esModule: true,
  default: {
    fetch: jest.fn().mockResolvedValue({}),
  },
}));

describe("Dragon Ball API Service", () => {
  describe("getAllCharacters", () => {
    const params: GetAllCharactersParams = { page: 1, name: "Luke" };

    it("should return a promise", () => {
      const promise = getAllCharacters();
      expect(promise).toBeInstanceOf(Promise);
    });

    it("should call apiClient.fetch with the correct endpoint and params", async () => {
      await getAllCharacters(params);
      expect(apiClient.fetch).toHaveBeenCalledWith(Endpoint.CHARACTERS, params);
    });
  });

  describe("getCharacter", () => {
    it("should return a promise", () => {
      const promise = getAllCharacters();
      expect(promise).toBeInstanceOf(Promise);
    });

    it("should call apiClient.fetch with the correct endpoint", async () => {
      await getCharacter(123);
      expect(apiClient.fetch).toHaveBeenCalledWith(
        `${Endpoint.CHARACTERS}/123`
      );
    });
  });
});
