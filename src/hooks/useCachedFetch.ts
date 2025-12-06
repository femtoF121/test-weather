import { getFromCache, setCache } from "@/utils/cache";
import { useEffect, useState } from "react";

export function useCachedFetch<DataT>(
  queryFn: () => Promise<DataT>,
  key: string,
  ttl = 10 * 60 * 1000
): { data: DataT | null; loading: boolean; error: boolean } {
  const [data, setData] = useState<DataT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWithCache = async () => {
      const cached = getFromCache<DataT>(key);

      if (cached && Date.now() - cached.time < ttl) {
        return cached.data;
      }

      const result = await queryFn();
      setCache(key, result);

      return result;
    };

    if (isMounted) {
      setLoading(true);
      fetchWithCache()
        .then((result) => {
          setData(result);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setData(null);
        })
        .finally(() => setLoading(false));
    }

    return () => {
      isMounted = false;
    };
  }, [key]);

  return { data, loading, error };
}
