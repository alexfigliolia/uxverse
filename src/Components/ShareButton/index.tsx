"use client";
import { ButtonHTMLAttributes } from "react";
import { ShareIconButton } from "Components/ShareIconButton";
import { useShareAPI } from "Hooks/useShareAPI";

export const ShareButton = ({ shareData, ...rest }: Props) => {
  const onClick = useShareAPI(shareData);
  return <ShareIconButton {...rest} onClick={onClick} />;
};

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  shareData: ShareData;
}
