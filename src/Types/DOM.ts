import { HTMLAttributes } from "react";

export type ContainerElement = "div" | "section" | "main";

export type ContainerElementProps<T extends ContainerElement = "section"> =
  HTMLAttributes<HTMLElementTagNameMap[T]> & {
    Tag?: T;
  };

export type TextTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "a"
  | "span"
  | "strong"
  | "legend";

export type TextProps<T extends TextTag = "h1"> = HTMLAttributes<
  HTMLElementTagNameMap[T]
> & {
  Tag?: T;
};
