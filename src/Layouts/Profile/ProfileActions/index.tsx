import { GradientBorderButton } from "Components/GradientBorderButton";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { HeartRibbon } from "Icons/HeartRibbon";
import { MessageFilled } from "Icons/Message";
import { Propless } from "Types/React";
import "./styles.scss";

export const ProfileActions = (_: Propless) => {
  return (
    <div className="profile-actions">
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
