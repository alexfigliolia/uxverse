import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const Spinner = ({ className, ...rest }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={classnames("spinner", className)}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <circle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
};
