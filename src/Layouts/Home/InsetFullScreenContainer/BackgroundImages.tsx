"use client";
import { useMemo } from "react";
import { IOptions } from "@figliolia/page-switch";
import { useWindowSize } from "@figliolia/react-hooks";
import { ImageRotator } from "Components/ImageRotator";
import { Propless } from "Types/React";

export const BackgroundImages = (_: Propless) => {
  const { width } = useWindowSize();
  const useSmallImages = useMemo(() => width <= 670, [width]);

  const images = useMemo(() => {
    if (useSmallImages) {
      return ["/background-pink-small.webp", "/background-neon-small.webp"];
    }
    return ["/background-pink.webp", "/background-neon.webp"];
  }, [useSmallImages]);

  const options: Partial<IOptions> = useMemo(
    () => ({
      arrowKey: false,
      autoplay: true,
      draggable: false,
      interval: 10000,
      mousewheel: false,
      transition: "bombCoverIn",
    }),
    [],
  );

  return <ImageRotator images={images} options={options} />;
};
