"use client";
import {
  ReactNode,
  RefCallback,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { Callback } from "Types/Generics";

export const OverscrollDetector = <T extends HTMLElement = HTMLElement>({
  ref,
  children,
}: Props) => {
  const node = useRef<T>(null);
  const mergedRefs = useMergedRefs(node, ref);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const childrenFN = useRef<OverScrollRenderFN<T>>(children);
  childrenFN.current = children;

  const detectOverscroll = useCallback(() => {
    if (!node.current) {
      return;
    }
    setClientHeight(node.current.clientHeight);
    setScrollHeight(node.current.scrollHeight);
  }, []);

  useEffect(() => {
    detectOverscroll();
  }, [detectOverscroll]);

  const isTruncated = useMemo(
    () => scrollHeight > clientHeight,
    [scrollHeight, clientHeight],
  );

  return useMemo(
    () =>
      childrenFN.current({
        ref: mergedRefs,
        clientHeight,
        scrollHeight,
        isTruncated,
      }),
    [mergedRefs, clientHeight, scrollHeight, isTruncated],
  );
};

export interface Props<T extends HTMLElement = HTMLElement> {
  ref?: RefObject<T | null>;
  children: OverScrollRenderFN;
}

type OverScrollRenderFN<T extends HTMLElement = HTMLElement> = Callback<
  [
    {
      scrollHeight: number;
      clientHeight: number;
      isTruncated: boolean;
      ref: RefCallback<T>;
    },
  ],
  ReactNode
>;
