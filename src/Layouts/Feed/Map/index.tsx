"use client";
import dynamic from "next/dynamic";
import { Propless } from "Types/React";

const PlacesMap = dynamic(
  () => import("Components/PlacesMap").then(v => v.PlacesMap),
  { ssr: false },
);

export const Map = (_: Propless) => {
  return (
    <div className="map">
      <PlacesMap />
    </div>
  );
};
