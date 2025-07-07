import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";
import { YoutubeFilled } from "./YoutubeFilled";

export const YoutubeColored = ({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <YoutubeFilled
      className={classnames("youtube-colored", className)}
      fill="#ea333d"
      {...rest}
    />
  );
};
