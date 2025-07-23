import { useEffect, useRef, useState } from "react";
import { FullBleedImage } from "Components/FullBleedImage";
import { PlaceholderImage } from "Components/PlaceholderImage";
import { Preloader } from "Tools/Preloader";

export const LazyImage = ({ alt, src, active, optimistic }: Props) => {
  const loadedImage = useRef<string>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (src !== loadedImage.current) {
      setLoaded(false);
    }
  }, [src]);

  useEffect(() => {
    if (active && !loaded) {
      void Preloader.loadImage(src).then(() => {
        loadedImage.current = src;
        setLoaded(true);
      });
    }
  }, [active, loaded, src]);

  return (
    <figure>
      {((loadedImage.current === src && loaded) || optimistic) && (
        <FullBleedImage src={src} alt={alt} />
      )}
      <PlaceholderImage />
    </figure>
  );
};

interface Props {
  src: string;
  active: boolean;
  optimistic: boolean;
  alt: string;
}
