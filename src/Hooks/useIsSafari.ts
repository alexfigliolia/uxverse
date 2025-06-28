"use client";
import { useEffect, useState } from "react";

export const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsSafari(
      navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
    setIsMobile(/(iPod|iPhone|iPad)/.test(navigator.userAgent));
  }, []);

  return { isSafari, isMobile };
};
