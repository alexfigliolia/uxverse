import { useCallback, useMemo, useRef, useState } from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { GooglePlaces, IPlace } from "PlacesClient";
import { usePlacesAPIErrorHandling } from "./usePlacesAPIErrorHandling";

export const usePlacesTextSearch = <T extends keyof IPlace>(mask: string) => {
  const query = useRef("");
  const signal = useRef<AbortController>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Pick<IPlace, T>[]>([]);
  const [pageToken, setPageToken] = useState<string | null>(null);

  const { error, notifyError } = usePlacesAPIErrorHandling();

  const googleSearch = useCallback(
    (textQuery: string = query.current, replace = false) => {
      query.current = textQuery;
      if (!textQuery) {
        return;
      }
      if (signal.current) {
        signal.current.abort("request overridden");
      }
      setLoading(true);
      notifyError(undefined);
      signal.current = new AbortController();
      void GooglePlaces.POST(`/v1/places:searchText`, {
        body: {
          textQuery,
        },
        params: {
          query: {
            alt: "json",
            key: process.env.NEXT_PUBLIC_MAPS_KEY!,
            fields: `nextPageToken,${mask}`,
            ...(pageToken ? { pageToken: pageToken } : undefined),
          },
        },
        signal: signal.current.signal,
      })
        .then(res => {
          if (res.data) {
            setPageToken(res.data.nextPageToken ?? null);
            setResults(s =>
              replace
                ? (res.data.places ?? [])
                : [...s, ...(res.data.places ?? [])],
            );
          } else if (res.error) {
            notifyError("UNKNOWN_ERROR");
          }
        })
        .catch(() => notifyError("NETWORK_ERROR"))
        .finally(() => {
          signal.current = null;
          setLoading(false);
        });
    },
    [pageToken, mask, notifyError],
  );

  const debouncer = useDebouncer(googleSearch, 500);

  const onSearch = useCallback(
    (search: string) => {
      setPageToken(null);
      void debouncer.execute(search, true);
    },
    [debouncer],
  );

  const fetchNextPage = useCallback(() => {
    if (pageToken) {
      googleSearch();
    }
  }, [googleSearch, pageToken]);

  return useMemo(
    () => ({
      error,
      loading,
      results,
      onSearch,
      fetchNextPage,
      hasNextPage: !!pageToken,
    }),
    [error, loading, results, onSearch, fetchNextPage, pageToken],
  );
};

export type PlacesError = "NETWORK_ERROR" | "UNKNOWN_ERROR";
