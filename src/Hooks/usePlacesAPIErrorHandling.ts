import { use, useCallback, useMemo, useState } from "react";
import { NotificationsContext } from "Layouts/InApp";

export const usePlacesAPIErrorHandling = () => {
  const { stack } = use(NotificationsContext);
  const [error, setError] = useState<PlacesError>();

  const notifyError = useCallback(
    (error: PlacesError | undefined) => {
      setError(error);
      if (error) {
        stack.push({
          type: "ERROR",
          message:
            error === "NETWORK_ERROR"
              ? "Something went wrong while finding places in your immediate surroundings. Please check you internet connection and try again"
              : "Something went wrong while finding places in your immediate surroundings. Please try again.",
        });
      }
    },
    [stack],
  );

  return useMemo(() => ({ error, notifyError }), [error, notifyError]);
};

export type PlacesError = "NETWORK_ERROR" | "UNKNOWN_ERROR";
