import { RefCallback, RefObject, useCallback } from "react";

export const useMergedRefs = <T>(
  ...refs: (RefObject<T | null> | RefCallback<T> | null | undefined)[]
) => {
  const ref = useCallback(
    (instance: T | null) => {
      for (const mergedRef of refs) {
        if (typeof mergedRef === "function") {
          mergedRef(instance);
        } else if (mergedRef && typeof mergedRef === "object") {
          mergedRef.current = instance;
        }
      }
    },
    [refs],
  );

  return ref;
};
