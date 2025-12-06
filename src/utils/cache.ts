const CACHE_KEY = "cache";

export const getFromCache = <DataT>(
  key: string
): { time: number; data: DataT } | null => {
  const stored = localStorage.getItem(CACHE_KEY);
  if (stored) {
    const cache = JSON.parse(stored);
    return cache[key] || null;
  } else return null;
};

export const setCache = (key: string, value: unknown) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  cache[key] = { time: Date.now(), data: value };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};
