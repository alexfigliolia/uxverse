import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Spinner } from "Components/Spinner";
import { CameraIcon } from "Icons/Camera";
import "./styles.scss";

export const CaptureTheMoment = ({ loading, ...rest }: Props) => {
  return (
    <label className={classnames("capture-the-moment", { loading })}>
      <div>
        <ReducedLetterSpacing Tag="span">
          Capture the Moment
        </ReducedLetterSpacing>
        <CameraIcon aria-hidden />
        <Spinner aria-hidden />
      </div>
      <HiddenFileInput
        multiple
        name="media"
        type="file"
        accept="image/*,video/*"
        {...rest}
      />
    </label>
  );
};

interface Props extends HTMLProps<HTMLInputElement> {
  loading: boolean;
}
