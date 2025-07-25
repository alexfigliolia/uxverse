import { use, useCallback, useMemo, useState } from "react";
import { NotificationsContext } from "Layouts/InApp";

export const DEFAULT_NOTIFIERS: PlacesError[] = [
  "NETWORK_ERROR",
  "UNKNOWN_ERROR",
];

export const usePlacesAPIErrorHandling = (
  notifyOn: PlacesError[] = DEFAULT_NOTIFIERS,
) => {
  const { stack } = use(NotificationsContext);
  const [error, setError] = useState<PlacesError>();

  const resetError = useCallback(() => {
    setError(undefined);
  }, []);

  const notifyError = useCallback(
    (error: PlacesError | undefined) => {
      setError(error);
      if (error && notifyOn.includes(error)) {
        stack.push({
          type: "ERROR",
          message:
            error === "NETWORK_ERROR"
              ? "Please check you internet connection and try again"
              : "Something went wrong while finding places in your immediate surroundings. Please try again.",
        });
      }
    },
    [stack, notifyOn],
  );

  return useMemo(
    () => ({ error, notifyError, resetError }),
    [error, notifyError, resetError],
  );
};

export type PlacesError = "NETWORK_ERROR" | "UNKNOWN_ERROR";
