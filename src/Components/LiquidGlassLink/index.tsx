"use client";
import Link from "next/link";
import { HTMLProps } from "react";
import { useLiquidGlassClasses } from "Components/LiquidGlassButton/useLiquidGlassClasses";
import "Components/LiquidGlassButton/styles.scss";

export const LiquidGlassLink = ({
  href,
  children,
  className,
  ...rest
}: Props) => {
  const classes = useLiquidGlassClasses(className);
  return (
    <Link href={href} className={classes} {...rest}>
      <div>{children}</div>
    </Link>
  );
};

interface Props extends Omit<HTMLProps<HTMLAnchorElement>, "href"> {
  href: string;
}
