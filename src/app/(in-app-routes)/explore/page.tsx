"use client";
import { useCallback, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { TargetFilled } from "Icons/Target";
import {
  MapLayout,
  MapLayoutProvider,
  SearchExperience,
} from "Layouts/Explore";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import "./styles.scss";

export default function Explore(_: Propless) {
  const recenter = useRef<Callback>(null);
  const map = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const mapNode = map.current?.firstChild as HTMLElement | null;
    if (mapNode) {
      const { height } = mapNode.getBoundingClientRect();
      const bound = Math.min(Math.max(window.scrollY, 0), height);
      mapNode.style.transition = "translate 10ms, scale 10ms";
      mapNode.style.scale = `${1 + (bound / height) * 0.25}`;
      mapNode.style.translate = `0 ${0.5 * bound}px`;
    }
  }, []);

  useScrollAnimation(onScroll);

  const recenterMap = useCallback(() => {
    recenter?.current?.();
  }, []);

  return (
    // TODO error boundary (this will throw)
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_KEY!}>
      <MapLayoutProvider>
        <div className="explore-page">
          <MapLayout ref={map} recenter={recenter}>
            <button
              className="recenter"
              onClick={recenterMap}
              aria-label="Center around your current position">
              <TargetFilled aria-hidden />
            </button>
          </MapLayout>
          <SearchExperience />
        </div>
      </MapLayoutProvider>
    </APIProvider>
  );
}
