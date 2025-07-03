import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { FullBleedImage } from "Components/FullBleedImage";
import "./styles.scss";

export const Avatar = ({ active, className, ...rest }: Props) => {
  return (
    <div
      className={classnames("avatar", className, { active: !!active })}
      {...rest}>
      <FullBleedImage src="/profile.jpg" alt="user-avatar" />
    </div>
  );
};

interface Props extends HTMLProps<HTMLDivElement> {
  active?: boolean;
}
