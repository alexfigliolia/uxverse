"use client";
import { useLayoutEffect, useRef } from "react";
import { IOptions, PageSwitch } from "@figliolia/page-switch";

export const usePageSwitch = <T extends HTMLElement = HTMLDivElement>(
  images: string[],
  options: Partial<IOptions> = {},
) => {
  const node = useRef<T>(null);

  useLayoutEffect(() => {
    let PW: PageSwitch | undefined = undefined;
    void import("@figliolia/page-switch").then(({ PageSwitch }) => {
      if (!node.current) {
        return;
      }
      PW = new PageSwitch(node.current, {
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
      PW?.destroy?.();
    };
  }, [options, images]);

  return node;
};
