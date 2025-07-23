import { useCallback, useState } from "react";
import { useThrottler } from "@figliolia/react-hooks";
import { ImageSlider, ScrollProgress } from "Components/ImageSlider";
import { LazyImage } from "./LazyImage";
import "./styles.scss";

export const PlacesImageSlider = ({ images, placeName }: Props) => {
  const [current, setCurrent] = useState(0);
  const [loadIndices, setLoadIndices] = useState(new Set([0]));

  const toMapsURL = useCallback((image: string) => {
    return `https://content-places.googleapis.com/v1/${image}/media?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&maxHeightPx=800&maxWidthPx=800`;
  }, []);

  const addLoadIndex = useCallback((index: number) => {
    setLoadIndices(c => {
      if (c.has(index)) {
        return c;
      }
      const copy = new Set(c);
      copy.add(index);
      return copy;
    });
  }, []);

  const onScrollProgress = useCallback(
    ({ progress }: ScrollProgress) => {
      const current = Math.floor(progress);
      const diff = progress - current;
      if (diff > 0.05) {
        addLoadIndex(Math.min(current + 1, images.length - 1));
      }
      if (progress - current > 0.9) {
        addLoadIndex(Math.max(0, current - 1));
      }
    },
    [addLoadIndex, images.length],
  );

  const throttler = useThrottler(onScrollProgress, 200);

  return (
    <ImageSlider
      onChange={setCurrent}
      className="places-slider"
      onScrollProgress={throttler.execute}
      aria-label={`Images of ${placeName}`}>
      {images.map((img, i) => (
        <LazyImage
          key={img}
          alt={placeName}
          src={toMapsURL(img)}
          optimistic={i === 0}
          active={loadIndices.has(i) || current === i}
        />
      ))}
    </ImageSlider>
  );
};

interface Props {
  images: string[];
  placeName: string;
}
