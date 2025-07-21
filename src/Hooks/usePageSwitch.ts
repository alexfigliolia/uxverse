"use client";
import { useEffect, useRef } from "react";
import { IOptions, PageSwitch } from "@figliolia/page-switch";
import { useClientLibrary } from "./useClientLibrary";

const loader = () => import("@figliolia/page-switch").then(v => v.PageSwitch);

export const usePageSwitch = <T extends HTMLElement = HTMLDivElement>(
  images: string[],
  options: Partial<IOptions> = {},
) => {
  const node = useRef<T>(null);
  const library = useClientLibrary(loader);

  useEffect(() => {
    let slider: PageSwitch | null = null;
    library?.onLoad?.(PageSwitch => {
      if (!node.current) {
        return;
      }
      slider = new PageSwitch(node.current, {
        arrowKey: true,
        autoplay: false,
        direction: 1,
        draggable: true,
        duration: 750,
        ease: "ease-out",
        interval: 0,
        loop: true,
        mousewheel: true,
        start: 0,
        transition: "scroll3dY",
        ...options,
      });
    });
    return () => {
      slider?.destroy?.();
    };
  }, [images, options, library]);

  return node;
};
