import { useEffect, useRef } from "react";

export const useMutationObserver = <T extends HTMLElement>(
  callback: MutationCallback,
  options?: MutationObserverInit,
) => {
  const node = useRef<T>(null);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new MutationObserver(callback);
    observer.observe(node.current, options);
    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return node;
};
