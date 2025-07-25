import { useCallback, useEffect, useMemo, useRef } from "react";
import { useThrottler } from "@figliolia/react-hooks";
import { GooglePlaces, IPlace } from "PlacesClient";
import { GeoCoordinate } from "Types/Geolocation";
import { PlacesError } from "./usePlacesAPIErrorHandling";
import { usePlacesNetworkState } from "./usePlacesNetworkState";

export const useNearBySearch = <T extends keyof IPlace>({
  mask,
  location,
  notifiers,
  loadingOnMount,
}: Config) => {
  const lastLocation = useRef<GeoCoordinate>(null);

  const {
    signal,
    loading,
    results,
    error,
    setResults,
    onRequestError,
    onAfterRequest,
    onBeforeRequest,
    onRequestResolved,
  } = usePlacesNetworkState<T>(loadingOnMount, notifiers);

  const googleSearch = useCallback(() => {
    if (!location) {
      return;
    }
    if (location === lastLocation.current) {
      return;
    }
    lastLocation.current = location;
    onBeforeRequest();
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
      signal: signal.current?.signal,
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
        }
        onRequestResolved(res);
      })
      .catch(onRequestError)
      .finally(onAfterRequest);
  }, [
    mask,
    signal,
    location,
    setResults,
    onBeforeRequest,
    onRequestError,
    onAfterRequest,
    onRequestResolved,
  ]);

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

interface Config {
  mask: string;
  loadingOnMount?: boolean;
  location?: GeoCoordinate;
  notifiers?: PlacesError[];
}
