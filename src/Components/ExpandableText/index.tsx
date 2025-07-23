"use client";
import { useCallback, useRef, useState } from "react";
import { classnames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { OverscrollDetector } from "Components/OverscrollDetector";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ExpandableText = ({
  className,
  children,
  onExpand,
  onCollapse,
  transitionDuration = 500,
}: Props) => {
  const timeout = useTimeout();
  const node = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState(false);
  const [disableTruncation, setDisableTruncation] = useState(false);

  const onClick = useCallback(() => {
    if (!window.getSelection()?.toString?.()?.length) {
      setExpand(e => {
        if (e) {
          onCollapse?.(node.current);
          timeout.execute(
            () => setDisableTruncation(false),
            transitionDuration,
          );
        } else {
          onExpand?.(node.current);
          setDisableTruncation(true);
        }
        return !e;
      });
    }
  }, [timeout, onExpand, onCollapse, transitionDuration]);

  return (
    <OverscrollDetector ref={node}>
      {({ ref, isTruncated, scrollHeight, clientHeight }) => (
        <div
          ref={ref}
          style={{
            "--client-height": `${clientHeight}px`,
            "--scroll-height": `${scrollHeight}px`,
            "--transition-duration": `${transitionDuration}ms`,
          }}
          role={isTruncated ? "button" : undefined}
          onClick={isTruncated ? onClick : undefined}
          aria-expanded={isTruncated ? expand : undefined}
          className={classnames("expandable-text", className, {
            expand,
            overscroll: isTruncated,
            "disable-truncation": isTruncated && disableTruncation,
          })}
          title={isTruncated ? "Click to expand" : undefined}>
          {children}
        </div>
      )}
    </OverscrollDetector>
  );
};

interface Props extends OptionalChildren {
  className?: string;
  transitionDuration?: number;
  onExpand?: Callback<[HTMLDivElement | null]>;
  onCollapse?: Callback<[HTMLDivElement | null]>;
}
