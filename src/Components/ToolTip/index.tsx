import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { TriangleIcon } from "Icons/Triangle";
import "./styles.scss";

export const ToolTip = ({
  children,
  onScroll,
  className,
  arrowPosition,
  ...rest
}: Props) => {
  return (
    <div className={classnames("tooltip", arrowPosition, className)} {...rest}>
      <div>
        <div onScroll={onScroll}>{children}</div>
        <TriangleIcon aria-hidden />
      </div>
    </div>
  );
};

interface Props extends HTMLProps<HTMLDivElement> {
  arrowPosition?: "left" | "right" | "center";
}
