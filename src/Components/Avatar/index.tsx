import { ComponentType, HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { FullBleedImage } from "Components/FullBleedImage";
import "./styles.scss";

export const Avatar = ({
  active,
  className,
  src = "/profile.jpg",
  ...rest
}: Props) => {
  return (
    <div
      className={classnames("avatar", className, { active: !!active })}
      {...rest}>
      <FullBleedImage src={src} alt="user-avatar" />
    </div>
  );
};

export interface Props extends HTMLProps<HTMLDivElement> {
  src?: string;
  active?: boolean;
}

export type AvatarComponent = ComponentType<Props>;
