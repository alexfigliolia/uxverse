"use client";
import { HTMLAttributes } from "react";
import { useLiquidGlassClasses } from "./useLiquidGlassClasses";
import "./styles.scss";

export const LiquidGlassButton = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  const classes = useLiquidGlassClasses(className);
  return (
    <button className={classes} {...rest}>
      <div>{children}</div>
    </button>
  );
};
