"use client";
import { useCallback, useState } from "react";
import { FullBleedImage } from "Components/FullBleedImage";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { useHiddenImageUploader } from "Hooks/useHiddenImageUploader";
import { BannerProps } from "../DefaultBanner";
import "./styles.scss";

export const BannerWithUploader = ({ ref }: BannerProps) => {
  const [image, setImage] = useState("/place-1.jpg");

  const onFile = useCallback((file: File) => {
    setImage(URL.createObjectURL(file));
  }, []);

  const { input, onChange, listener } = useHiddenImageUploader(onFile);

  return (
    <label className="banner-with-uploader" tabIndex={0} {...listener.events}>
      <FullBleedImage ref={ref} src={image} alt="banner image" />
      <HiddenFileInput
        ref={input}
        multiple={false}
        accept="image/*"
        onChange={onChange}
        title="Change profile background"
      />
    </label>
  );
};
