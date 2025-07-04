"use client";
import { useCallback, useEffect, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ExploreResult, SearchInput } from "Layouts/Explore";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import "./styles.scss";

const API_KEY = process.env.NEXT_PUBLIC_MAPS_KEY!;
if (!API_KEY) {
  throw new Error("TODO: redirect somewhere");
}

export default function Explore(_: Propless) {
  const recenter = useRef<Callback>(null);
  const map = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const mapNode = map.current?.firstChild as HTMLElement | null;
      if (mapNode) {
        const { height } = mapNode.getBoundingClientRect();
        const bound = Math.min(Math.max(window.scrollY, 0), height);
        mapNode.style.transition = "translate 10ms, scale 10ms";
        mapNode.style.scale = `${1 + (bound / height) * 0.25}`;
        mapNode.style.translate = `0 ${0.5 * bound}px`;
      }
    });
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const recenterMap = useCallback(() => {
    recenter?.current?.();
  }, []);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(result => {
      alert(result.state);
      // if (result.state === "granted") {
      //   report(result.state);
      //   geoBtn.style.display = "none";
      // } else if (result.state === "prompt") {
      //   report(result.state);
      //   geoBtn.style.display = "none";
      //   navigator.geolocation.getCurrentPosition(
      //     revealPosition,
      //     positionDenied,
      //     geoSettings,
      //   );
      // } else if (result.state === "denied") {
      //   report(result.state);
      //   geoBtn.style.display = "inline";
      // }
      // result.addEventListener("change", () => {
      //   report(result.state);
      // });
    });
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="explore-page">
        {/* <MapLayout ref={map} recenter={recenter}>
          <button
            className="recenter"
            onClick={recenterMap}
            aria-label="Center around your current position">
            <TargetFilled />
          </button>
        </MapLayout> */}
        <div className="explore-page__feed">
          <div>
            <search>
              <SearchInput />
            </search>
            <section className="explore-page__feed-results">
              <ExploreResult />
              <ExploreResult />
              <ExploreResult />
              <ExploreResult />
              <ExploreResult />
            </section>
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
