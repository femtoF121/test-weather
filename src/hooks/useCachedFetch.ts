import { getFromCache, setCache } from "@/utils/cache";
import { useEffect, useRef, useState } from "react";

export function useCachedFetch<DataT>(
  queryFn: () => Promise<DataT>,
  key: string,
  ttl = 10 * 60 * 1000
): { data: DataT | null; loading: boolean; error: boolean } {
  const [data, setData] = useState<DataT | null>(() => {
    const cached = getFromCache<DataT>(key, ttl);
    if (cached) return cached;
    return null;
  });
  const [loading, setLoading] = useState(null === data);
  const [error, setError] = useState(false);
  const queryFnRef = useRef(queryFn);

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  useEffect(() => {
    let isMounted = true;

    const fetchWithCache = async () => {
      const cached = getFromCache<DataT>(key, ttl);
      if (cached) return cached;

      const result = await queryFnRef.current();
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
      isMounted = false;
    };
  }, [key, ttl]);

  return { data, loading, error };
}
