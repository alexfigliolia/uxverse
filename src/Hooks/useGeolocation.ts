import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Position } from "Components/GoogleMap";
import { Callback } from "Types/Generics";

type Permission = "UNKNOWN" | "ALLOWED" | "DENIED" | "UNAVAILABLE";
type LocationError = "TIMEOUT" | "UNAVAILABLE" | "NONE";

const GEOLOCATION_OPTIONS = {
  timeout: 5000,
  maximumAge: 0,
};

let cachedPosition: Position | undefined = undefined;

const initialLocationError = (): LocationError => {
  if (navigator?.geolocation) {
    return "NONE";
  }
  return "UNAVAILABLE";
};

const initialPermission = (): Permission => {
  if (navigator?.geolocation) {
    return "UNKNOWN";
  }
  return "UNAVAILABLE";
};

export const useGeolocation = (onLocation?: Callback<[Position]>) => {
  const watchID = useRef<number | null>(null);
  const [position, setPosition] = useState<Position | undefined>(
    cachedPosition,
  );
  const [permission, setPermission] = useState<Permission>(initialPermission());
  const [locationError, setLocationError] = useState<LocationError>(
    initialLocationError(),
  );

  const onPosition = useCallback(
    ({ coords }: GeolocationPosition) => {
      setPermission("ALLOWED");
      const { latitude, longitude } = coords;
      cachedPosition = { lat: latitude, lng: longitude };
      setPosition(cachedPosition);
      onLocation?.(cachedPosition);
    },
    [onLocation],
  );

  const onError = useCallback((e: GeolocationPositionError) => {
    if (e.code === e.PERMISSION_DENIED) {
      setPermission("DENIED");
    } else if (e.code === e.POSITION_UNAVAILABLE) {
      setPermission("ALLOWED");
      setLocationError("UNAVAILABLE");
    } else if (e.code === e.TIMEOUT) {
      setLocationError("TIMEOUT");
      setPermission("ALLOWED");
    }
  }, []);

  const watchPosition = useCallback(() => {
    if (watchID.current) {
      return;
    }
    watchID.current = navigator?.geolocation?.watchPosition?.(
      onPosition,
      onError,
      GEOLOCATION_OPTIONS,
    );
  }, [onPosition, onError]);

  const refreshLocation = useCallback(() => {
    navigator?.geolocation?.getCurrentPosition?.(
      onPosition,
      onError,
      GEOLOCATION_OPTIONS,
    );
  }, [onPosition, onError]);

  const queryUserPosition = useCallback(() => {
    if (cachedPosition) {
      return onLocation?.(cachedPosition);
    }
    refreshLocation();
  }, [onLocation, refreshLocation]);

  useEffect(() => {
    return () => {
      if (watchID.current) {
        navigator?.geolocation?.clearWatch?.(watchID.current);
      }
    };
  }, []);

  return useMemo(
    () => ({
      position,
      permission,
      locationError,
      watchPosition,
      refreshLocation,
      queryUserPosition,
    }),
    [
      position,
      permission,
      locationError,
      watchPosition,
      refreshLocation,
      queryUserPosition,
    ],
  );
};
