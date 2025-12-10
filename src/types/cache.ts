export type CacheEntry<DataT = unknown> = { time: number; data: DataT };

export type CacheStore<DataT = unknown> = Record<string, CacheEntry<DataT>>;
