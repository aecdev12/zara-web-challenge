import {
  retrieveFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";
import "@testing-library/jest-dom";

jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
Object.setPrototypeOf(window.localStorage.getItem, jest.fn());

const TEST_KEY = "testKey";

describe("Local Storage Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("retrieveFromLocalStorage", () => {
    it("should return the fallback value if window is not defined (server-side)", () => {
      const oldWindow = global.window;
      // @ts-ignore
      delete global.window;

      const FALLBACK = "fallback";
      const result = retrieveFromLocalStorage(TEST_KEY, FALLBACK);
      expect(result).toBe(FALLBACK);

      global.window = oldWindow;
    });

    it("should return the fallback value if localStorage returns null", () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

      const FALLBACK = "fallback";
      const result = retrieveFromLocalStorage(TEST_KEY, FALLBACK);
      expect(window.localStorage.getItem).toHaveBeenCalledWith(TEST_KEY);
      expect(result).toBe(FALLBACK);
    });

    it("should return the fallback value if JSON parsing fails", () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(
        "Invalid JSON"
      );

      const FALLBACK = { default: "value" };
      const result = retrieveFromLocalStorage(TEST_KEY, FALLBACK);
      expect(result).toBe(FALLBACK);
    });

    it("should return a parsed value if data in localStorage is valid JSON", () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify({ foo: "bar" })
      );

      const result = retrieveFromLocalStorage(TEST_KEY, {});
      expect(result).toEqual({ foo: "bar" });
    });
  });

  describe("setToLocalStorage", () => {
    it("should return false if window is not defined (server-side)", () => {
      const oldWindow = global.window;
      // @ts-ignore
      delete global.window;

      const result = setToLocalStorage(TEST_KEY, null);
      expect(result).toBe(false);

      global.window = oldWindow;
    });

    it("should store the data as a JSON string and return true on success", () => {
      const sampleData = { name: "Test" };
      const result = setToLocalStorage(TEST_KEY, sampleData);

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        TEST_KEY,
        JSON.stringify(sampleData)
      );
      expect(result).toBe(true);
    });

    it("should return false if JSON.stringify throws an error", () => {
      const originalStringify = JSON.stringify;
      JSON.stringify = jest.fn(() => {
        throw new Error("Failed to stringify");
      });

      const result = setToLocalStorage(TEST_KEY, { sample: "data" });
      expect(result).toBe(false);

      JSON.stringify = originalStringify;
    });
  });
});
