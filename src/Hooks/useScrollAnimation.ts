import { useCallback, useEffect } from "react";
import { Callback } from "Types/Generics";

export const useScrollAnimation = (lerp: Callback<[]>) => {
  const onScroll = useCallback(() => {
    requestAnimationFrame(lerp);
  }, [lerp]);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
};
