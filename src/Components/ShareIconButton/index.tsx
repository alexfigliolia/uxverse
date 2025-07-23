"use client";
import { ButtonHTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import { ShareIcon } from "Icons/Share";
import "./styles.scss";

export const ShareIconButton = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className={classnames("share-button", className)}>
      {children}
      <ShareIcon aria-hidden />
    </button>
  );
};
