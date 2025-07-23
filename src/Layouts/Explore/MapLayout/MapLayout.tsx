"use client";
import {
  RefObject,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMap } from "@vis.gl/react-google-maps";
import { AvatarMarker } from "Components/AvatarMarker";
import { GoogleMap, Position } from "Components/GoogleMap";
import { useGeolocation } from "Hooks/useGeolocation";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import { MapLayoutContext } from "./Context";
import "./styles.scss";

export const MapLayout = ({ ref, recenter, children }: Props) => {
  const map = useMap();
  const { setLocation } = use(MapLayoutContext);

  const onLocation = useCallback(
    (position: Position) => {
      map?.setCenter?.(position);
      setLocation({
        latitude: position.lat,
        longitude: position.lng,
      });
    },
    [map, setLocation],
  );

  const { position, watchPosition, refreshLocation, queryUserPosition } =
    useGeolocation(onLocation);

  useEffect(() => {
    refreshLocation();
    watchPosition();
  }, [refreshLocation, watchPosition]);

  useImperativeHandle(recenter, () => queryUserPosition, [queryUserPosition]);

  const classes = useClassNames("map-layout", {
    hidden: !position,
    displayNone: false,
  });

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
