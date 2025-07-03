import { ButtonHTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import { X } from "Icons/X";
import "./styles.scss";

export const CloserButton = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={classnames("closer-button", className)} {...rest}>
      <X aria-hidden />
    </button>
  );
};
