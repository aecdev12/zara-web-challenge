import "@testing-library/jest-dom";
import {
  FALLBACK_URL,
  FETCH_REVALIDATION_TIME,
  HttpClient,
  createDefaultClient,
} from "@/api/client";

global.fetch = jest.fn();

describe("HttpClient", () => {
  const BASE_URL = "https://test-api.example.com";
  const client = new HttpClient(BASE_URL);

  it("should construct the correct URL without params", async () => {
    const mockFetchResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: "test data" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

    const response = await client.fetch("/test");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://test-api.example.com/test?",
      expect.objectContaining({
        cache: "force-cache",
        next: { revalidate: 86400 }, // 60 * 60 * 24
      })
    );
    expect(response).toEqual({ data: "test data" });
  });

  it("should append query parameters correctly", async () => {
    const mockFetchResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: "param data" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

    const params = { param1: "value1", param2: 123 };
    const response = await client.fetch("/test", params);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://test-api.example.com/test?param1=value1&param2=123",
      expect.objectContaining({
        cache: "force-cache",
        next: { revalidate: FETCH_REVALIDATION_TIME },
      })
    );
    expect(response).toEqual({ data: "param data" });
  });

  it("should throw an error when response is not ok", async () => {
    const mockFetchResponse = {
      ok: false,
      statusText: "Not Found",
      json: jest.fn(),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

    await expect(client.fetch("/error")).rejects.toThrow("Not Found");
  });

  it("should return parsed JSON data when response is ok", async () => {
    const mockData = { result: "success" };
    const mockFetchResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockFetchResponse);

    const result = await client.fetch("/success");
    expect(result).toEqual(mockData);
    expect(mockFetchResponse.json).toHaveBeenCalledTimes(1);
  });

  it("should return a new HttpClient constructed with the API_BASE_URL env variable", () => {
    const defaultClient = createDefaultClient();
    expect(defaultClient.baseUrl).toBe(process.env.API_BASE_URL);
  });

  it("should return a new HttpClient constructed with a FALLBACK_URL as the baseUrl if the API_BASE_URL env variable is missing", () => {
    const originalEnv = { ...process.env };
    delete process.env.API_BASE_URL;

    const defaultClient = createDefaultClient();
    expect(defaultClient.baseUrl).toBe(FALLBACK_URL);
    process.env = originalEnv;
  });
});
