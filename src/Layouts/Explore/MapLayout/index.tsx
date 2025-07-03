"use client";
import {
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMap } from "@vis.gl/react-google-maps";
import { AvatarMarker } from "Components/AvatarMarker";
import { GoogleMap, Position } from "Components/GoogleMap";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

const GEOLOCATION_OPTIONS = {
  timeout: 5000,
  maximumAge: 0,
};

let cachedPosition: Position | undefined = undefined;

export const MapLayout = ({ ref, recenter, children }: Props) => {
  const map = useMap();
  const [position, setPosition] = useState<Position | undefined>(
    cachedPosition,
  );

  const onPosition = useCallback(
    ({ coords }: GeolocationPosition) => {
      const { latitude, longitude } = coords;
      cachedPosition = { lat: latitude, lng: longitude };
      map?.setCenter?.(cachedPosition);
      setPosition(cachedPosition);
    },
    [map],
  );

  const centerAroundUserLocation = useCallback(() => {
    if (!cachedPosition) {
      return navigator?.geolocation?.getCurrentPosition(
        onPosition,
        null,
        GEOLOCATION_OPTIONS,
      );
    }
    map?.setCenter?.(cachedPosition);
    setPosition(cachedPosition);
  }, [map, onPosition]);

  useEffect(() => {
    if (map && cachedPosition) {
      map.setCenter(cachedPosition);
    }
    centerAroundUserLocation();
    const ID = navigator?.geolocation?.watchPosition(
      onPosition,
      null,
      GEOLOCATION_OPTIONS,
    );
    return () => {
      navigator?.geolocation?.clearWatch(ID);
    };
  }, [onPosition, map, centerAroundUserLocation]);

  useImperativeHandle(recenter, () => centerAroundUserLocation, [
    centerAroundUserLocation,
  ]);

  const classes = useClassNames("map-layout", { hidden: !position });

  return (
    <div className={classes} ref={ref}>
      <GoogleMap location={position ?? { lat: 0, lng: 0 }} defaultZoom={14}>
        {position && <AvatarMarker currentUser position={position} />}
      </GoogleMap>
      {children}
    </div>
  );
};

interface Props extends OptionalChildren {
  ref?: RefObject<HTMLDivElement | null>;
  recenter?: RefObject<Callback | null>;
}
