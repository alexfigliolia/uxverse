"use client";
import { ButtonHTMLAttributes, useCallback } from "react";
import { ShareIconButton } from "Components/ShareIconButton";

export const ShareButton = ({ shareData, ...rest }: Props) => {
  const onClick = useCallback(() => {
    if (typeof window === "undefined" || !navigator.share) {
      return;
    }
    void navigator.share(shareData).catch(() => {});
  }, [shareData]);

  return <ShareIconButton {...rest} onClick={onClick} />;
};

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  shareData: ShareData;
}
