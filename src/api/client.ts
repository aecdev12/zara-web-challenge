import { URLSearchParams } from "url";

type SearchParamsRecord = Record<string, string | number>;

export const FETCH_REVALIDATION_TIME: number = 60 * 60 * 24;
export const FALLBACK_URL: string = "";

export class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private generateParams(params: SearchParamsRecord): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `?${searchParams}`;
  }

  async fetch<TData, TParams extends SearchParamsRecord>(
    path: string,
    params?: TParams
  ): Promise<TData> {
    const response = await fetch(
      `${this.baseUrl}${path}${this.generateParams(params || {})}`,
      {
        cache: "force-cache",
        next: { revalidate: FETCH_REVALIDATION_TIME },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as TData;
  }
}

export const createDefaultClient = () => {
  return new HttpClient(process.env.API_BASE_URL || FALLBACK_URL);
};

export default createDefaultClient();
