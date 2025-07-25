import { useCallback, useMemo, useState } from "react";
import { IPlace } from "PlacesClient/index";
import { useAbortOnUmount } from "./useAbortOnUmount";
import {
  DEFAULT_NOTIFIERS,
  PlacesError,
  usePlacesAPIErrorHandling,
} from "./usePlacesAPIErrorHandling";

export const usePlacesNetworkState = <T extends keyof IPlace>(
  loadingOnMount = false,
  notifiers: PlacesError[] = DEFAULT_NOTIFIERS,
) => {
  const signal = useAbortOnUmount();
  const [loading, setLoading] = useState(loadingOnMount);
  const [results, setResults] = useState<Pick<IPlace, T>[]>([]);

  const { error, notifyError, resetError } =
    usePlacesAPIErrorHandling(notifiers);

  const onBeforeRequest = useCallback(() => {
    if (signal.current) {
      signal.current.abort("request overridden");
    }
    setLoading(true);
    resetError();
    signal.current = new AbortController();
  }, [resetError, signal]);

  const onRequestResolved = useCallback(
    (response: any) => {
      if (response.error) {
        notifyError("UNKNOWN_ERROR");
      }
    },
    [notifyError],
  );

  const onRequestError = useCallback(
    (error: any) => {
      if (error !== "request overridden") {
        notifyError("NETWORK_ERROR");
      }
    },
    [notifyError],
  );

  const onAfterRequest = useCallback(() => {
    signal.current = null;
    setLoading(false);
  }, [signal]);

  return useMemo(
    () => ({
      signal,
      loading,
      results,
      setResults,
      error,
      onBeforeRequest,
      onRequestResolved,
      onRequestError,
      onAfterRequest,
    }),
    [
      signal,
      loading,
      results,
      error,
      onBeforeRequest,
      onRequestResolved,
      onRequestError,
      onAfterRequest,
    ],
  );
};
