import { getFromCache, setCache } from "@/utils/cache";
import { useEffect, useRef, useState } from "react";
import {
  useCachedFetchProps,
  useCachedFetchReturn,
} from "./useCachedFetch.type";

export function useCachedFetch<DataT>(
  props: useCachedFetchProps<DataT>
): useCachedFetchReturn<DataT> {
  const { queryFn, key, ttl = 5 * 60 * 1000, enabled = true } = props;
  const [data, setData] = useState<DataT | null>(
    enabled ? getFromCache<DataT>(key, ttl) : null
  );
  const [loading, setLoading] = useState(enabled ? null === data : false);
  const [error, setError] = useState(false);
  const queryFnRef = useRef(queryFn);

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchWithCache = async () => {
      const cached = getFromCache<DataT>(key, ttl);
      if (cached) return cached;

      const result = await queryFnRef.current(controller.signal);
      setCache(key, result);

      return result;
    };

    setLoading(true);
    fetchWithCache()
      .then((result) => {
        if (!isMounted) return;
        setData(result);
        setError(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(true);
        setData(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      controller.abort();
      isMounted = false;
    };
  }, [key, ttl, enabled]);

  return { data, loading, error };
}
