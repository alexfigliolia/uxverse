import { RefObject } from "react";
import { FullBleedImage } from "Components/FullBleedImage";

export const DefaultBanner = ({ ref }: BannerProps) => {
  return <FullBleedImage ref={ref} src="/place-1.jpg" alt="banner image" />;
};

export interface BannerProps {
  ref?: RefObject<HTMLImageElement | null>;
}
