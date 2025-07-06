import { classnames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PostInput = ({ className, children }: Props) => {
  return (
    <label className={classnames("post-input", className)}>{children}</label>
  );
};

interface Props extends OptionalChildren {
  className?: string;
}
