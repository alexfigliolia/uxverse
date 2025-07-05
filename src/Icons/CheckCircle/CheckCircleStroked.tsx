import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const CheckCircleStroked = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="transparent"
      className={classnames("check-circle-stroked", className)}
      {...rest}>
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
};
