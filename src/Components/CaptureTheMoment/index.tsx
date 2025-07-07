import { HTMLProps } from "react";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { CameraIcon } from "Icons/Camera";
import "./styles.scss";

export const CaptureTheMoment = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <label className="capture-the-moment">
      <ReducedLetterSpacing Tag="span">Capture the Moment</ReducedLetterSpacing>
      <CameraIcon />
      <HiddenFileInput
        multiple
        name="media"
        type="file"
        accept="image/*,video/*"
        {...props}
      />
    </label>
  );
};
