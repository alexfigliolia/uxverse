import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const FullBleedVideo = ({
  className,
  ...rest
}: HTMLProps<HTMLVideoElement>) => {
  return (
    <video {...rest} className={classnames("full-bleed-video", className)} />
  );
};
