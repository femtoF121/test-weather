import { CacheStore } from "@/types/cache";

//!!!
const CACHE_KEY = "cache";

export const getFromCache = <DataT>(key: string, ttl: number): DataT | null => {
  const stored = localStorage.getItem(CACHE_KEY);
  if (!stored) return null;

  try {
    const cache = JSON.parse(stored) as CacheStore;
    const cached = cache[key];
    if (cached && Date.now() - cached.time < ttl) return cached.data as DataT;
    return null;
  } catch (e) {
    console.error("Failed to read cache from localStorage", e);
    return null;
  }
};

export const setCache = <DataT>(key: string, value: DataT) => {
  try {
    const cache = JSON.parse(
      localStorage.getItem(CACHE_KEY) || "{}"
    ) as CacheStore;
    cache[key] = { time: Date.now(), data: value };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("Failed to read cache from localStorage", e);
  }
};
