"use client";
import { Fragment, useEffect, useState } from "react";
import { APILoader } from "@googlemaps/extended-component-library/react";
import { Propless } from "Types/React";
import "./styles.scss";

const DEFAULT_ZOOM_WITH_LOCATION = 16;

export const PlacesMap = (_: Propless) => {
  const [position, setPosition] = useState<string>(
    `40.77783782171723,-73.7827814609203`,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("received position", position);
        setPosition(`${position.coords.latitude},${position.coords.longitude}`);
      },
      error => console.log("position error", error),
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <Fragment>
      <APILoader apiKey={process.env.NEXT_PUBLIC_MAPS_KEY} />
      {position && (
        <gmp-map
          map-id="a36db72e58ea1c4ba25877a3"
          center={position}
          zoom={DEFAULT_ZOOM_WITH_LOCATION}></gmp-map>
      )}
    </Fragment>
  );
};
