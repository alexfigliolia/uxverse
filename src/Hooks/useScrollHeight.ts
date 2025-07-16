import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Callback } from "Types/Generics";

export const useScrollHeight = <
  T extends HTMLElement = HTMLElement,
  D extends string | number = number,
>(
  defaultValue = 0 as D,
  onHeight?: Callback<[number]>,
) => {
  const measureRef = useRef<T>(null);
  const [height, setHeight] = useState<D | number>(defaultValue);

  const cacheHeight = useCallback(() => {
    if (measureRef.current) {
      setHeight(measureRef.current.scrollHeight ?? "unset");
      onHeight?.(measureRef.current.scrollHeight ?? "unset");
    }
  }, [onHeight]);

  useEffect(() => {
    cacheHeight();
  }, [cacheHeight]);

  const maxHeight = useMemo(
    () => (typeof height === "number" ? `${height}px` : height),
    [height],
  );

  return useMemo(
    () => [measureRef, maxHeight, cacheHeight] as const,
    [maxHeight, cacheHeight],
  );
};
