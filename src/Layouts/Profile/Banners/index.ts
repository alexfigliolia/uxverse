import { ComponentType, RefObject } from "react";

export * from "./BannerWithUploader";
export * from "./DefaultBanner";
export type BannerComponent = ComponentType<{
  ref: RefObject<HTMLImageElement | null>;
}>;
