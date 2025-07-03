import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const X = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("x-icon", className)}
      {...rest}>
      <g strokeWidth="1" fill="none" fillRule="evenodd">
        <g>
          <line
            x1="16.9999"
            y1="7"
            x2="7.00001"
            y2="16.9999"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="7.00006"
            y1="7"
            x2="17"
            y2="16.9999"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>
      {children}
    </svg>
  );
};
