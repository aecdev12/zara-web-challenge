export const retrieveFromLocalStorage = <T>(
  key: string,
  fallBackValue: T
): T => {
  if (typeof window === "undefined") return fallBackValue;

  const rawData: string | null = window.localStorage.getItem(key);

  if (!rawData) return fallBackValue;

  try {
    return JSON.parse(rawData);
  } catch {
    return fallBackValue;
  }
};

export const setToLocalStorage = (key: string, data: unknown): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const stringifiedData: string = JSON.stringify(data);
    window.localStorage.setItem(key, stringifiedData);
    return true;
  } catch {
    return false;
  }
};
