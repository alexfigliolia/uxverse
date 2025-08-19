import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { TextTag } from "Types/DOM";
import "./styles.scss";

export const ScreenReaderOnly = <T extends TextTag>({
  Tag,
  className,
  children,
  ...rest
}: Props<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("sr-only", className)} {...rest}>
      {children}
    </Tag>
  );
};

type Props<T extends TextTag> = {
  Tag: T;
} & HTMLProps<HTMLElementTagNameMap[T]>;
