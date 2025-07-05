import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Position } from "Components/GoogleMap";
import { GPSLocation, LocationError, Permission } from "Tools/GPSLocation";
import { Callback } from "Types/Generics";

let cachedPosition: Position | undefined = undefined;

export const useGeolocation = (onLocation?: Callback<[Position]>) => {
  const watchID = useRef<number | null>(null);
  const [position, setPosition] = useState<Position | undefined>(
    cachedPosition,
  );
  const [permission, setPermission] = useState<Permission>(
    GPSLocation.INITIAL_PERMISSION,
  );
  const [locationError, setLocationError] = useState<LocationError>(
    GPSLocation.INITIAL_LOCATION_ERROR,
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
    watchID.current = GPSLocation.watchPosition(onPosition, onError);
  }, [onPosition, onError]);

  const refreshLocation = useCallback(() => {
    GPSLocation.getPosition(onPosition, onError);
  }, [onPosition, onError]);

  const queryUserPosition = useCallback(() => {
    if (cachedPosition) {
      return onLocation?.(cachedPosition);
    }
    refreshLocation();
  }, [onLocation, refreshLocation]);

  useEffect(() => {
    if (cachedPosition) {
      onLocation?.(cachedPosition);
    }
    return () => {
      if (watchID.current) {
        GPSLocation.clearWatch(watchID.current);
      }
    };
  }, [onLocation]);

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
