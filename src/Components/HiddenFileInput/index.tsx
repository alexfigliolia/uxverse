import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const HiddenFileInput = ({
  className,
  ...rest
}: Omit<HTMLProps<HTMLInputElement>, "type">) => {
  return (
    <input
      type="file"
      className={classnames("hidden-file-input", className)}
      {...rest}
    />
  );
};
