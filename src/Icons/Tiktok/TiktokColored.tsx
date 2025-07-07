import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const TiktokColored = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={classnames("tiktok-colored", className)}
      {...rest}>
      <rect rx="15%" height="512" width="512" fill="#ffffff" />
      <defs>
        <path
          id="tiktik_blend"
          d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z"
          style={{ mixBlendMode: "multiply" }}
        />
        {children}
      </defs>
      <use href="#tiktik_blend" fill="#f05" x="18" y="15" />
      <use href="#tiktik_blend" fill="#0ee" />
    </svg>
  );
};
