import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";
/* eslint-disable jsx-a11y/alt-text */

export const FullBleedImage = ({
  className,
  ...rest
}: HTMLProps<HTMLImageElement>) => {
  return (
    <img {...rest} className={classnames("full-bleed-image", className)} />
  );
};
