"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "@figliolia/react-hooks";
import { ImageRotator } from "Components/ImageRotator";
import { Propless } from "Types/React";

export const BackgroundImages = (_: Propless) => {
  const { width } = useWindowSize();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (width <= 670) {
      setImages(["/background-pink-small.webp", "/background-neon-small.webp"]);
    }
    setImages(["/background-pink.webp", "/background-neon.webp"]);
  }, [width]);

  return (
    <ImageRotator
      images={images}
      options={{
        arrowKey: false,
        autoplay: true,
        direction: 1,
        draggable: false,
        duration: 750,
        ease: "ease-out",
        interval: 10000,
        loop: true,
        mousewheel: false,
        start: 0,
        transition: "bombCoverIn",
      }}
    />
  );
};
