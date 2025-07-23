import { Fragment, useCallback, useState } from "react";
import { ImageSlider, ScrollProgress } from "Components/ImageSlider";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { LazyImage } from "./LazyImage";
import "./styles.scss";

export const PlacesImageSlider = ({ images, placeName }: Props) => {
  const [loadIndices, setLoadIndices] = useState(new Set([0]));

  const toMapsURL = useCallback((image: string) => {
    return `https://content-places.googleapis.com/v1/${image}/media?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&maxHeightPx=800&maxWidthPx=800`;
  }, []);

  const onScrollProgress = useCallback(({ progress }: ScrollProgress) => {
    const current = Math.floor(progress);
    if (progress - current > 0.05) {
      setLoadIndices(c => {
        const copy = new Set(c);
        copy.add(current + 1);
        return copy;
      });
    }
  }, []);

  return (
    <ImageSlider
      className="places-slider"
      onScrollProgress={onScrollProgress}
      aria-label={`Images of ${placeName}`}
      fixedChildren={
        <Fragment>
          <ReducedLetterSpacing Tag="h2">{placeName}</ReducedLetterSpacing>
        </Fragment>
      }>
      {images.map((img, i) => (
        <LazyImage
          key={img}
          alt={placeName}
          src={toMapsURL(img)}
          optimistic={i === 0}
          active={loadIndices.has(i)}
        />
      ))}
    </ImageSlider>
  );
};

interface Props {
  images: string[];
  placeName: string;
}
