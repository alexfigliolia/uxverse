import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const UserStroked = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("user-stroked", className)}
      {...rest}>
      <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
      <ellipse cx="12" cy="17" rx="7" ry="4" strokeWidth="1.5" />
      {children}
    </svg>
  );
};
