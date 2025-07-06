import { ButtonHTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import "./styles.scss";

export const GradientBorderButton = ({
  text,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={classnames("gradient-border-button", className)}
      {...rest}>
      <div>
        {text && <ReducedLetterSpacing Tag="span">{text}</ReducedLetterSpacing>}
        {children}
      </div>
    </button>
  );
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}
