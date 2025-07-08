"use client";
import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Props } from "Components/FullNameInput";
import { SocialMediaHandleInput } from "Components/SocialMediaHandleInput";
import { useInputValidity } from "Hooks/useInputValidity";
import { YoutubeIcon } from "Icons/Youtube";
import { InputPatterns } from "Tools/InputPatterns";
import "./styles.scss";

export const YoutubeHandleInput = ({
  className,
  ...rest
}: Omit<Props, "placeholder">) => {
  const classes = useClassNames("youtube-handle-input", className);

  const onInvalid = useCallback((value: string) => {
    if (value.includes(" ")) {
      return "Youtube handles cannot contain spaces";
    }
    if (value.length > 30 || value.length < 3) {
      return "Youtube handles must be between 3 and 30 characters";
    }
    if (InputPatterns.youtubeHandleValidator.test(value)) {
      return "Youtube handles can only contain letters, numbers, periods, hyphens, and underscores";
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);

  return (
    <SocialMediaHandleInput
      feedback
      className={classes}
      feedbackText={feedback}
      placeholder="Youtube Handle"
      IconFilled={YoutubeIcon}
      IconStroked={YoutubeIcon}
      onValidityChange={onValidityChange}
      pattern={InputPatterns.youtubeHandle}
      {...rest}
    />
  );
};
