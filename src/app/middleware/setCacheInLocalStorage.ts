import { clearCache, setCacheEntry } from "@/features/cache/cacheSlice";
import { setCache } from "@/utils/cache";
import type { Middleware } from "@reduxjs/toolkit";

export const setCacheInLocalStorage: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (setCacheEntry.match(action) || clearCache.match(action)) {
      const state = store.getState();
      setCache(state.cache);
    }

    return result;
  };
