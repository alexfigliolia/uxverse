import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThrottler } from "@figliolia/react-hooks";
import { GooglePlaces, IPlace } from "PlacesClient";
import { GeoCoordinate } from "Types/Geolocation";
import { useAbortOnUmount } from "./useAbortOnUmount";
import { usePlacesAPIErrorHandling } from "./usePlacesAPIErrorHandling";

export const useNearBySearch = <T extends keyof IPlace>(
  mask: string,
  location?: GeoCoordinate,
) => {
  const lastLocation = useRef<GeoCoordinate>(null);
  const signal = useAbortOnUmount();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Pick<IPlace, T>[]>([]);

  const { error, notifyError } = usePlacesAPIErrorHandling();

  const googleSearch = useCallback(() => {
    if (!location) {
      return;
    }
    if (location === lastLocation.current) {
      return;
    }
    lastLocation.current = location;
    if (signal.current) {
      signal.current.abort("request overridden");
    }
    setLoading(true);
    notifyError(undefined);
    signal.current = new AbortController();
    void GooglePlaces.POST("/v1/places:searchNearby", {
      body: {
        maxResultCount: 18,
        locationRestriction: {
          circle: {
            center: location,
            radius: 500.0,
          },
        },
        rankPreference: "POPULARITY",
      },
      params: {
        query: {
          alt: "json",
          key: process.env.NEXT_PUBLIC_MAPS_KEY!,
          fields: mask,
        },
      },
      signal: signal.current.signal,
    })
      .then(res => {
        if (res.data) {
          const hashedIDs = new Set();
          const responseSet = res.data.places ?? [];
          const resultSet: Pick<IPlace, T>[] = [];
          for (const place of responseSet) {
            if (place.id && !hashedIDs.has(place.id)) {
              hashedIDs.add(place.id);
              resultSet.push(place);
            }
          }
          setResults(resultSet);
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
  }, [mask, notifyError, location, signal]);

  const throttler = useThrottler(googleSearch, 500);

  useEffect(() => {
    if (!results.length && location) {
      throttler.execute();
    }
  }, [location, throttler, results.length]);

  return useMemo(
    () => ({
      error,
      loading,
      results,
    }),
    [error, loading, results],
  );
};
