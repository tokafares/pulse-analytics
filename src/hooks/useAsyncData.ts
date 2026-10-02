import { useEffect, useRef, useState } from "react";

export interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: ReadonlyArray<unknown> = []
): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    fetcherRef.current()
      .then((result) => {
        if (!isCancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, isLoading, error };
}
