export type CacheEntry<DataT> = { time: number; data: DataT };

export type CacheStore<DataT = unknown> = Record<string, CacheEntry<DataT>>;
