import { useCallback, useMemo, useRef, useState } from "react";
import { useDebouncer, useMount } from "@figliolia/react-hooks";
import { GooglePlaces, IPlace } from "PlacesClient";
import { useAbortOnUmount } from "./useAbortOnUmount";
import { usePlacesAPIErrorHandling } from "./usePlacesAPIErrorHandling";

export const usePlacesTextSearch = <T extends keyof IPlace>(
  mask: string,
  defaultQuery = "",
) => {
  const query = useRef(defaultQuery);
  const signal = useAbortOnUmount();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Pick<IPlace, T>[]>([]);
  const [pageToken, setPageToken] = useState<string | null>(null);

  const { error, notifyError } = usePlacesAPIErrorHandling();

  const googleSearch = useCallback(
    (textQuery: string = query.current, replace = false) => {
      query.current = textQuery || defaultQuery;
      if (!query.current) {
        return setResults([]);
      }
      if (signal.current) {
        signal.current.abort("request overridden");
      }
      setLoading(true);
      notifyError(undefined);
      signal.current = new AbortController();
      void GooglePlaces.POST(`/v1/places:searchText`, {
        body: {
          textQuery: query.current,
          maxResultCount: 18,
        },
        params: {
          query: {
            alt: "json",
            key: process.env.NEXT_PUBLIC_MAPS_KEY!,
            fields: mask === "*" ? "*" : `nextPageToken,${mask}`,
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
        .catch(e => {
          if (e !== "request overridden") {
            notifyError("NETWORK_ERROR");
          }
        })
        .finally(() => {
          signal.current = null;
          setLoading(false);
        });
    },
    [pageToken, mask, notifyError, signal, defaultQuery],
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

  useMount(() => {
    if (query.current) {
      googleSearch();
    }
  });

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
