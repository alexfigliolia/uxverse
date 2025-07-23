import {
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebouncer } from "@figliolia/react-hooks";
import { LeftChevron } from "Icons/LeftChevron";
import { RightChevron } from "Icons/RightChevron";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const ImageSlider = ({
  children,
  onChange,
  className,
  fixedChildren,
  onScrollProgress,
  role = "group",
  ...rest
}: Props) => {
  const { length } = children;
  const scrollViewID = useId();
  const [current, setCurrent] = useState(0);
  const scrollView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollView.current) {
      return;
    }
    onChange?.(current);
    let left = 0;
    const children = scrollView.current.children;
    for (let i = 0; i < current; i++) {
      left += children[i].clientWidth;
    }
    scrollView.current.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [current, onChange]);

  const previous = useCallback(() => {
    setCurrent(c => (c - 1 < 0 ? length - 1 : c - 1));
  }, [length]);

  const next = useCallback(() => {
    setCurrent(c => (c + 1 >= length ? 0 : c + 1));
  }, [length]);

  const setScrollIndex = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const debouncer = useDebouncer(setScrollIndex, 200);

  const onScroll = useCallback(() => {
    if (!scrollView.current) {
      return;
    }
    const { scrollLeft, scrollWidth } = scrollView.current;
    const progress = Math.floor((scrollLeft * length) / scrollWidth);
    onScrollProgress?.({
      total: length,
      progress: (scrollLeft * length) / scrollWidth,
    });
    debouncer.execute(Math.floor(progress));
  }, [debouncer, length, onScrollProgress]);

  const classes = useClassNames("image-slider", className);

  return (
    <div
      role={role}
      className={classes}
      aria-roledescription="carousel"
      {...rest}>
      <div
        ref={scrollView}
        id={scrollViewID}
        aria-live="off"
        aria-atomic="false"
        onScroll={onScroll}
        className="image-slider__scroll-view">
        {children.map((node, i) => {
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${length}`}>
              {node}
            </div>
          );
        })}
      </div>
      <div className="image-slider__controls">
        <button
          onClick={previous}
          aria-label="Previous Slide"
          aria-controls={scrollViewID}>
          <LeftChevron aria-hidden />
        </button>
        <button
          onClick={next}
          aria-label="Next Slide"
          aria-controls={scrollViewID}>
          <RightChevron aria-hidden />
        </button>
      </div>
      {fixedChildren && (
        <div className="image-slider__fixed-children">{fixedChildren}</div>
      )}
    </div>
  );
};

interface Props
  extends Omit<
    HTMLProps<HTMLDivElement>,
    "role" | "aria-roledescription" | "onChange"
  > {
  role?: "region" | "group";
  children: ReactNode[];
  onChange?: Callback<[number]>;
  fixedChildren?: ReactNode;
  onScrollProgress?: Callback<[ScrollProgress]>;
}

export interface ScrollProgress {
  total: number;
  progress: number;
}
