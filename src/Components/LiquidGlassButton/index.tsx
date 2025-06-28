"use client";
import { HTMLAttributes } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const LiquidGlassButton = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  const classes = useClassNames("liquid-glass-button", className);
  return (
    <button className={classes} {...rest}>
      <div>{children}</div>
    </button>
  );
};
