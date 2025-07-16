"use client";
import { ReactNode, RefCallback, useMemo } from "react";
import { useScrollHeightObserver } from "Hooks/useScrollHeightObserver";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const MaxHeightObserver = <T extends HTMLElement = HTMLElement>({
  children,
  onHeight,
}: Props) => {
  const [ref, height] = useScrollHeightObserver<T, string>("unset", onHeight);
  const maxHeight = useMemo(
    () => (height === "unset" ? height : `${height}px`),
    [height],
  );
  return useMemo(
    () => children(ref, maxHeight, "max-height-observer"),
    [children, ref, maxHeight],
  );
};

interface Props<T extends HTMLElement = HTMLElement> {
  onHeight?: Callback<[number]>;
  children: Callback<[RefCallback<T>, string, string], ReactNode>;
}
