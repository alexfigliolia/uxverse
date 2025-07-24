import { useCallback, useEffect, useRef } from "react";
import { Callback } from "Types/Generics";

export const useFocusOutside = <T extends HTMLElement = HTMLElement>(
  active: boolean,
  onFocusOutside: Callback,
) => {
  const container = useRef<T>(null);

  const detectFocusOut = useCallback(
    (e: FocusEvent) => {
      if (e.target && !container.current?.contains?.(e.target as HTMLElement)) {
        onFocusOutside();
      }
    },
    [onFocusOutside],
  );

  useEffect(() => {
    if (active) {
      document.addEventListener("focusin", detectFocusOut);
    } else {
      document.removeEventListener("focusin", detectFocusOut);
    }
    return () => {
      document.removeEventListener("focusin", detectFocusOut);
    };
  }, [active, detectFocusOut]);

  return container;
};
