"use client";
import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Props } from "Components/FullNameInput";
import { SocialMediaHandleInput } from "Components/SocialMediaHandleInput";
import { useInputValidity } from "Hooks/useInputValidity";
import { TiktokColored, TiktokStroked } from "Icons/Tiktok";
import { InputPatterns } from "Tools/InputPatterns";
import "./styles.scss";

export const TiktokHandleInput = ({
  className,
  ...rest
}: Omit<Props, "placeholder">) => {
  const classes = useClassNames("tiktok-handle-input", className);

  const onInvalid = useCallback((value: string) => {
    if (value.includes(" ")) {
      return "Tiktok handles cannot contain spaces";
    }
    if (value.length > 24 || value.length < 3) {
      return "Tiktok handles must be between 3 and 24 characters";
    }
    if (InputPatterns.tikotkHandleValidator.test(value)) {
      return "Tiktok handles can only contain letters, numbers, periods, and underscores";
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);

  return (
    <SocialMediaHandleInput
      feedback
      className={classes}
      feedbackText={feedback}
      placeholder="Tiktok Handle"
      IconFilled={TiktokColored}
      IconStroked={TiktokStroked}
      onValidityChange={onValidityChange}
      pattern={InputPatterns.tiktokHandle}
      {...rest}
    />
  );
};
