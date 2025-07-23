import { useCallback, useMemo, useRef, useState } from "react";
import { useDebouncer } from "@figliolia/react-hooks";
import { GooglePlaces } from "PlacesClient";
import { useAbortOnUmount } from "./useAbortOnUmount";
import { usePlacesAPIErrorHandling } from "./usePlacesAPIErrorHandling";

export const useAutoCompletePlaces = () => {
  const query = useRef("");
  const signal = useAbortOnUmount();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const { error, notifyError } = usePlacesAPIErrorHandling();

  const googleSearch = useCallback(
    (textQuery: string = query.current) => {
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
      void GooglePlaces.POST("/v1/places:autocomplete", {
        body: {
          input: textQuery,
        },
        params: {
          query: {
            alt: "json",
            key: process.env.NEXT_PUBLIC_MAPS_KEY!,
            fields:
              "suggestions.placePrediction.placeId,suggestions.placePrediction.types,suggestions.placePrediction.structuredFormat.mainText.text,suggestions.placePrediction.structuredFormat.secondaryText.text",
          },
        },
        signal: signal.current.signal,
      })
        .then(res => {
          if (res.data?.suggestions) {
            const results: PlaceSuggestion[] = [];
            for (const entry of res.data.suggestions) {
              if (entry.placePrediction) {
                results.push({
                  id: entry.placePrediction?.placeId ?? "-1",
                  name:
                    entry.placePrediction?.structuredFormat?.mainText?.text ??
                    "",
                  address:
                    entry.placePrediction?.structuredFormat?.secondaryText
                      ?.text ?? "",
                  types: entry.placePrediction?.types ?? [],
                });
              }
            }
            setResults(results);
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
    [notifyError, signal],
  );

  const debouncer = useDebouncer(googleSearch, 500);

  const onSearch = useCallback(
    (search: string) => {
      void debouncer.execute(search);
    },
    [debouncer],
  );

  return useMemo(
    () => ({
      error,
      loading,
      results,
      onSearch,
    }),
    [error, loading, results, onSearch],
  );
};

export interface PlaceSuggestion {
  id: string;
  name: string;
  address: string;
  types: string[];
}
