import { useCallback, useMemo, useRef, useState } from "react";
import { useDebouncer, useMount } from "@figliolia/react-hooks";
import { GooglePlaces, IPlace } from "PlacesClient";
import { PlacesCache } from "Tools/PlacesCache";
import { DEFAULT_NOTIFIERS, PlacesError } from "./usePlacesAPIErrorHandling";
import { usePlacesNetworkState } from "./usePlacesNetworkState";

const URL = "/v1/places:searchText";

export const usePlacesTextSearch = <T extends keyof IPlace>({
  mask,
  defaultQuery = "",
  loadingOnMount = false,
  notifiers = DEFAULT_NOTIFIERS,
}: Config) => {
  const query = useRef(defaultQuery);
  const {
    signal,
    error,
    loading,
    results,
    setResults,
    onAfterRequest,
    onBeforeRequest,
    onRequestError,
    onRequestResolved,
  } = usePlacesNetworkState<T>(loadingOnMount, notifiers);
  const [pageToken, setPageToken] = useState<string | null>(null);

  const googleSearch = useCallback(
    (textQuery: string = query.current, replace = false) => {
      query.current = textQuery || defaultQuery;
      if (!query.current) {
        return setResults([]);
      }
      onBeforeRequest();
      const options = {
        textQuery: query.current,
        maxResultCount: 18,
        ...(pageToken ? { pageToken: pageToken } : undefined),
      };
      const result = PlacesCache.checkCache(URL, options);
      if (result) {
        setPageToken(result.data.nextPageToken ?? null);
        setResults(s =>
          replace
            ? (result.data.places ?? [])
            : [...s, ...(result.data.places ?? [])],
        );
        return onAfterRequest();
      }
      void GooglePlaces.POST(URL, {
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
        signal: signal.current?.signal,
      })
        .then(res => {
          if (res.data) {
            PlacesCache.cacheRequest(URL, options)(res);
            setPageToken(res.data.nextPageToken ?? null);
            setResults(s =>
              replace
                ? (res.data.places ?? [])
                : [...s, ...(res.data.places ?? [])],
            );
          }
          onRequestResolved(res);
        })
        .catch(onRequestError)
        .finally(onAfterRequest);
    },
    [
      mask,
      signal,
      pageToken,
      setResults,
      defaultQuery,
      onAfterRequest,
      onBeforeRequest,
      onRequestError,
      onRequestResolved,
    ],
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

interface Config {
  mask: string;
  defaultQuery?: string;
  loadingOnMount?: boolean;
  notifiers?: PlacesError[];
}
