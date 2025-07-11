"use client";
import { useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Dimensions, Options, useSizeObserver } from "@figliolia/size-observer";
import { OptionalChildren } from "Types/React";

export const OverscrollDetector = <T extends keyof HTMLElementTagNameMap>({
  children,
  Tag,
  className,
}: Props<T>) => {
  const [overscroll, setOverscroll] = useState(false);

  const detectOverscroll = useCallback(
    (_: Dimensions, node: HTMLElementTagNameMap[T]) => {
      setOverscroll(node.scrollHeight > node.clientHeight);
    },
    [],
  );

  const options: Options<HTMLElementTagNameMap[T]> = useMemo(
    () => ({
      width: false,
      height: true,
      onChange: detectOverscroll,
    }),
    [detectOverscroll],
  );

  const screen = useSizeObserver<HTMLElementTagNameMap[T]>(options);

  const classes = useClassNames(className, { overscroll });

  return (
    // @ts-ignore
    <Tag className={classes} ref={screen}>
      {children}
    </Tag>
  );
};

interface Props<T extends keyof HTMLElementTagNameMap>
  extends OptionalChildren {
  Tag: T;
  className?: string;
}
