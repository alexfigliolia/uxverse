"use client";
import { HTMLAttributes, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { IOptions } from "@figliolia/page-switch";
import { usePageSwitch } from "Hooks/usePageSwitch";
import "./styles.scss";

export const ImageRotator = ({
  images,
  options,
  className,
  ...rest
}: Props) => {
  const node = usePageSwitch(images, options);
  const classes = useClassNames("image-rotator", className);

  const backgroundStyles = useCallback(
    (image: string) => ({
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  return (
    <div
      ref={node}
      className={classes}
      aria-roledescription="carousel"
      {...rest}
      style={images[0] ? backgroundStyles(images[0]) : undefined}>
      {images.map((img, i) => (
        <div key={i} style={backgroundStyles(img)} />
      ))}
    </div>
  );
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  images: string[];
  options: Partial<IOptions>;
}
