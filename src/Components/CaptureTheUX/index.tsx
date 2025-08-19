import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { HiddenFileInput } from "Components/HiddenFileInput";
import { LoadingIndicator } from "Components/LoadingIndicator";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { CameraIcon } from "Icons/Camera";
import "./styles.scss";

export const CaptureTheUX = ({ loading, ...rest }: Props) => {
  return (
    <label className={classnames("capture-the-ux", { loading })}>
      <div>
        <ReducedLetterSpacing Tag="span">
          Capture the Experience
        </ReducedLetterSpacing>
        <CameraIcon aria-hidden />
        <LoadingIndicator loading={loading} ariaLabel="Uploading Media" />
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
