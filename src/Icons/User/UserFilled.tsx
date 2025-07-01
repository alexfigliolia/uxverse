import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const UserFilled = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("user-filled", className)}
      {...rest}>
      <circle cx="12" cy="6" r="4" />
      <ellipse cx="12" cy="17" rx="7" ry="4" />
      {children}
    </svg>
  );
};
