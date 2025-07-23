import { useEffect, useRef } from "react";

export const useAbortOnUmount = () => {
  const signal = useRef<AbortController>(null);
  useEffect(() => {
    const abortSignal = signal.current;
    return () => {
      abortSignal?.abort?.();
    };
  }, []);
  return signal;
};
