"use client";
import { useCallback, useState } from "react";
import { Avatar } from "Components/Avatar";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { useHiddenImageUploader } from "Hooks/useHiddenImageUploader";
import { Propless } from "Types/React";
import "./styles.scss";

export const AvatarUploader = (_: Propless) => {
  const [image, setImage] = useState("/profile.jpg");

  const onFile = useCallback((file: File) => {
    setImage(URL.createObjectURL(file));
  }, []);

  const { input, onChange, listener } = useHiddenImageUploader(onFile);

  return (
    <div className="avatar-uploader" tabIndex={0} {...listener.events}>
      <Avatar active src={image} />
      <HiddenFileInput
        ref={input}
        multiple={false}
        accept="image/*"
        onChange={onChange}
        title="Change profile image"
      />
    </div>
  );
};
