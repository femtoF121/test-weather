import type { CacheStore } from "@/types/cache";
import { getCache } from "@/utils/cache";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CacheStore = getCache() || {};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setCacheEntry<DataT>(
      state: CacheStore,
      action: PayloadAction<{ key: string; data: DataT }>
    ) {
      state[action.payload.key] = {
        time: Date.now(),
        data: action.payload.data,
      };
    },
    clearCache() {
      return {};
    },
  },
});

export const { setCacheEntry, clearCache } = cacheSlice.actions;

export default cacheSlice.reducer;
export { initialState as initialCacheState };
