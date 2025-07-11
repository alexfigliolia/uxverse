import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const ChevronDown = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={classnames("chevron-down", className)}
      {...rest}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 7l6 6 6-6"
      />
      {children}
    </svg>
  );
};
