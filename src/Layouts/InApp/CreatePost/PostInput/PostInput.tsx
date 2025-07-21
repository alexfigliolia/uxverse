import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const PostInput = ({
  className,
  children,
  ...rest
}: HTMLProps<HTMLLabelElement>) => {
  return (
    <label className={classnames("post-input", className)} {...rest}>
      {children}
    </label>
  );
};
