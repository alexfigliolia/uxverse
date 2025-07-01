import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const LocationStroked = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classnames("location-stroked", className)}
      {...rest}>
      <g>
        <g>
          <path
            d="M9.17891 20.3113C9.25802 20.3888 9.33618 20.4651 9.41324 20.54C9.432 20.5582 9.4507 20.5762 9.46932 20.594M9.17891 20.3113C6.44969 17.6366 2.58692 13.4269 3.69458 8.49C5.64705 -0.169998 18.3629 -0.159997 20.3054 8.5C21.4452 13.58 17.3222 17.88 14.5769 20.54C12.6034 22.4618 11.4373 22.4798 9.46932 20.594M9.17891 20.3113L9.46932 20.594"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="9.5" r="2.5" strokeWidth="1.5" />
        </g>
      </g>
      {children}
    </svg>
  );
};
