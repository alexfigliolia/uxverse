import { ComponentType, HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { HeartRibbon } from "Icons/HeartRibbon";
import { MessageFilled } from "Icons/Message";
import "./styles.scss";

export const ProfileActions = ({
  className,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={classnames("profile-actions", className)} {...rest}>
      <GradientBorderButton text="message">
        <MessageFilled aria-hidden />
      </GradientBorderButton>
      <button>
        <ReducedLetterSpacing Tag="span">Follow</ReducedLetterSpacing>
        <HeartRibbon aria-hidden />
      </button>
    </div>
  );
};

export type ProfileActionsComponent = ComponentType<HTMLProps<HTMLDivElement>>;
