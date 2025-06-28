"use client";
import { useClassNames } from "@figliolia/classnames";
import { useIsSafari } from "Hooks/useIsSafari";
import { TextProps, TextTag } from "Types/DOM";
import "./styles.scss";

export const SafariAwareText = <T extends TextTag = "h1">({
  children,
  className,
  // @ts-ignore
  Tag = "h1",
  ...rest
}: TextProps<T>) => {
  const { isSafari, isMobile } = useIsSafari();
  const classes = useClassNames(className, { isSafari, isMobile });
  return (
    // @ts-ignore
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};
