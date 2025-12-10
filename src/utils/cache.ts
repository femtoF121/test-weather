import { CACHE_STORAGE_KEY } from "@/constants/cache";
import { CacheStore } from "@/types/cache";

export const getCache = (): CacheStore | null => {
  const stored = localStorage.getItem(CACHE_STORAGE_KEY);
  if (!stored) return null;

  try {
    const cache = JSON.parse(stored) as CacheStore;
    return cache;
  } catch (e) {
    console.error("Failed to read cache from localStorage", e);
  }

  return null;
};

export const getFromCache = <DataT>(
  cache: CacheStore,
  key: string,
  ttl: number
): DataT | null => {
  try {
    const cached = cache[key];
    if (cached && Date.now() - cached.time < ttl) return cached.data as DataT;
    return null;
  } catch (e) {
    console.error("Failed to read cache from localStorage", e);
    return null;
  }
};

export const setCache = (cache: CacheStore) => {
  localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
};
