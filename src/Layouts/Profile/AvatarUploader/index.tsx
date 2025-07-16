"use client";
import { useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Avatar, type Props } from "Components/Avatar";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { useHiddenImageUploader } from "Hooks/useHiddenImageUploader";
import "./styles.scss";

export const AvatarUploader = ({
  className,
  active,
  src = "/profile.jpg",
  ...rest
}: Props) => {
  const [image, setImage] = useState(src);

  const onFile = useCallback((file: File) => {
    setImage(URL.createObjectURL(file));
  }, []);

  const { input, onChange, listener } = useHiddenImageUploader(onFile);

  const classes = useClassNames("avatar-uploader", className);

  return (
    <div className={classes} {...rest} tabIndex={0} {...listener.events}>
      <Avatar src={image} active={active} />
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
