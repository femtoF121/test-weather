export interface useCachedFetchProps<DataT> {
  queryFn: () => Promise<DataT>;
  key: string;
  ttl?: number;
  enabled?: boolean;
}

export interface useCachedFetchReturn<DataT> {
  data: DataT | null;
  loading: boolean;
  error: boolean;
}
