import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useWindowSize } from "@figliolia/react-hooks";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import Variables from "Styles/Exports.module.scss";

const PROFILE_HORIZONTAL_LAYOUT_WIDTH = parseInt(
  Variables.profileHorizontalLayout,
);

export const useScrollingAnimation = () => {
  const headerHeight = useRef(0);
  const previousPosition = useRef(0);
  const { width } = useWindowSize();
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [compress, setCompress] = useState(false);
  const image = useRef<HTMLImageElement>(null);

  const cacheHeaderHeight = useCallback((height: number) => {
    headerHeight.current = height;
  }, []);

  const onScroll = useCallback(() => {
    let threshold = 200;
    if (image.current) {
      threshold = image.current.clientHeight;
    }
    const direction = window.scrollY > previousPosition.current ? 1 : -1;
    previousPosition.current = window.scrollY;
    if (direction === 1 && window.scrollY >= headerHeight.current * 0.75) {
      setCompress(true);
    } else if (direction === -1 && window.scrollY < threshold * 1.5) {
      setCompress(false);
    }
  }, []);

  useScrollAnimation(onScroll, animate);

  useEffect(() => {
    setReady(true);
  }, []);

  const enableScrollAnimations = useMemo(
    () => width < PROFILE_HORIZONTAL_LAYOUT_WIDTH,
    [width],
  );

  useEffect(() => {
    setAnimate(enableScrollAnimations);
  }, [enableScrollAnimations]);

  const classes = useClassNames({ ready, compress });

  return useMemo(
    () => [classes, cacheHeaderHeight, image] as const,
    [classes, cacheHeaderHeight],
  );
};
