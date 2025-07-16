import { useCallback, useEffect } from "react";
import { Callback } from "Types/Generics";

export const useScrollAnimation = (lerp: Callback<[]>, active = true) => {
  const onScroll = useCallback(() => {
    requestAnimationFrame(lerp);
  }, [lerp]);

  useEffect(() => {
    if (active) {
      onScroll();
      window.addEventListener("scroll", onScroll);
    } else {
      window.removeEventListener("scroll", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll, active]);
};
