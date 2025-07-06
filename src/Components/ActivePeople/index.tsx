import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { Avatar } from "Components/Avatar";
import "./styles.scss";

export const ActivePeople = ({
  ref,
  className,
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div ref={ref} className={classnames("active-people", className)} {...rest}>
      <ul aria-label="Recently Active People">
        <li>
          <Avatar active />
        </li>
        <li>
          <Avatar active />
        </li>
        <li>
          <Avatar active />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
      {children}
    </div>
  );
};
