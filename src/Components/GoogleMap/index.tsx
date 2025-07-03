"use client";
import { useClassNames } from "@figliolia/classnames";
import { Map } from "@vis.gl/react-google-maps";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const GoogleMap = ({
  location,
  defaultZoom = 3,
  className,
  children,
}: Props) => {
  const classes = useClassNames("google-map", className);
  return (
    <Map
      reuseMaps
      className={classes}
      defaultCenter={location}
      defaultZoom={defaultZoom}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="a36db72e58ea1c4ba25877a3">
      {children}
    </Map>
  );
};

interface Props extends OptionalChildren {
  className?: string;
  defaultZoom?: number;
  location: Position;
}

export interface Position {
  lat: number;
  lng: number;
}
