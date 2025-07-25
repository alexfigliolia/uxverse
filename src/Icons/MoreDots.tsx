import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const MoreDots = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={classnames("more-dots", className)}
      {...rest}>
      <path
        fillRule="evenodd"
        d="M12 3a2 2 0 10-4 0 2 2 0 004 0zm-2 5a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z"
      />
      {children}
    </svg>
  );
};
