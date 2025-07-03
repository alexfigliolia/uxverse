import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const SearchSquare = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("search-square-icon", className)}
      {...rest}>
      <path
        d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
        strokeWidth="2"
      />
      <path
        d="M14 14L16 16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z"
        strokeWidth="2"
      />
      {children}
    </svg>
  );
};
