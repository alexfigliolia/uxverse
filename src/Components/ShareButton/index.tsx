"use client";
import { ButtonHTMLAttributes, useCallback } from "react";
import { classnames } from "@figliolia/classnames";
import { ShareIcon } from "Icons/Share";
import "./styles.scss";

export const ShareButton = ({
  shareData,
  children,
  className,
  ...rest
}: Props) => {
  const onClick = useCallback(() => {
    if (typeof window === "undefined" || !navigator.share) {
      return;
    }
    void navigator.share(shareData).catch(() => {});
  }, [shareData]);

  return (
    <button
      {...rest}
      onClick={onClick}
      className={classnames("share-button", className)}>
      {children}
      <ShareIcon aria-hidden />
    </button>
  );
};

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  shareData: ShareData;
}
