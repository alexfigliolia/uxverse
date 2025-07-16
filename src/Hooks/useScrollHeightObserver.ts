import { useCallback, useMemo, useRef, useState } from "react";
import { Options, useSizeObserver } from "@figliolia/size-observer";
import { Callback } from "Types/Generics";
import { useMergedRefs } from "./useMergedRefs";

export const useScrollHeightObserver = <
  T extends HTMLElement = HTMLElement,
  D extends string | number = number,
>(
  defaultValue = 0 as D,
  onHeight?: Callback<[string | number]>,
) => {
  const measureRef = useRef<T>(null);
  const [height, setHeight] = useState<D | number>(defaultValue);

  const cacheHeight = useCallback(() => {
    if (measureRef.current) {
      setHeight(measureRef.current.scrollHeight ?? "unset");
      onHeight?.(measureRef.current.scrollHeight ?? "unset");
    }
  }, [onHeight]);

  const options: Options = useMemo(
    () => ({
      width: false,
      height: true,
      onChange: cacheHeight,
    }),
    [cacheHeight],
  );

  const node = useSizeObserver<T>(options);

  const ref = useMergedRefs(measureRef, node);

  console.log(height);

  return useMemo(() => [ref, height] as const, [ref, height]);
};
