import { useEffect, useMemo, useRef, useState } from "react";
import { FullBleedImage } from "Components/FullBleedImage";
import { LoadingIndicator } from "Components/LoadingIndicator";
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
      void Preloader.loadImage(src)
        .then(() => {
          loadedImage.current = src;
          setLoaded(true);
        })
        // TODO - images will fail to load potentially
        .catch(() => {});
    }
  }, [active, loaded, src]);

  const isLoaded = useMemo(
    () => loadedImage.current === src && loaded,
    [src, loaded],
  );

  return (
    <figure>
      {(isLoaded || optimistic) && <FullBleedImage src={src} alt={alt} />}
      <PlaceholderImage />
      {/* TODO screen reader test */}
      <LoadingIndicator loading={!isLoaded} ariaLabel="" />
    </figure>
  );
};

interface Props {
  src: string;
  active: boolean;
  optimistic: boolean;
  alt: string;
}
