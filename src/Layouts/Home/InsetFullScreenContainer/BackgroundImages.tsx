"use client";
import { useEffect, useMemo, useState } from "react";
import { IOptions } from "@figliolia/page-switch";
import { useWindowSize } from "@figliolia/react-hooks";
import { ImageRotator } from "Components/ImageRotator";
import { Propless } from "Types/React";

export const BackgroundImages = (_: Propless) => {
  const { width } = useWindowSize();
  const [images, setImages] = useState(["/main-bg.webp"]);
  const useSmallImages = useMemo(() => width <= 670, [width]);

  useEffect(() => {
    if (useSmallImages) {
      return setImages(["/main-bg.webp"]);
    }
    setImages(["/main-bg.webp"]);
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
