import { type DependencyList, useCallback, useEffect, useState } from 'react';

import { getErrorMessage } from '@/api';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** Re-runs the request, e.g. after a mutation. */
  refetch: () => Promise<void>;
}

/**
 * Runs an async request on mount and whenever `deps` change, tracking loading and
 * error state. A stale response is discarded if the dependencies change mid-flight,
 * which keeps a fast second search from being overwritten by a slow first one.
 */
export function useFetch<T>(request: () => Promise<T>, deps: DependencyList): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // `request` is recreated on every render by callers, so the dependency list the
  // caller passes is what decides when a refetch happens.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(request, deps);

  const load = useCallback(
    async (isActive: () => boolean) => {
      setLoading(true);
      setError(null);

      try {
        const result = await run();

        if (isActive()) {
          setData(result);
        }
      } catch (err) {
        if (isActive()) {
          setError(getErrorMessage(err));
          setData(null);
        }
      } finally {
        if (isActive()) {
          setLoading(false);
        }
      }
    },
    [run],
  );

  useEffect(() => {
    let active = true;

    void load(() => active);

    return () => {
      active = false;
    };
  }, [load]);

  const refetch = useCallback(() => load(() => true), [load]);

  return { data, loading, error, refetch };
}
