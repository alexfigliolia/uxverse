import { HTMLAttributes } from "react";

export type DivOrSection = "div" | "section";

export type DivOrSectionProps<T extends DivOrSection = "section"> =
  HTMLAttributes<HTMLElementTagNameMap[T]> & {
    Tag?: T;
  };

export type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export type TextProps<T extends TextTag = "h1"> = HTMLAttributes<
  HTMLElementTagNameMap[T]
> & {
  Tag?: T;
};
