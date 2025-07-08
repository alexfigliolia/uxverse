"use client";
import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Props } from "Components/FullNameInput";
import { SocialMediaHandleInput } from "Components/SocialMediaHandleInput";
import { useInputValidity } from "Hooks/useInputValidity";
import { InstagramColored, InstagramStroked } from "Icons/Instagram";
import { InputPatterns } from "Tools/InputPatterns";
import "./styles.scss";

export const InstagramHandleInput = ({
  className,
  ...rest
}: Omit<Props, "placeholder">) => {
  const classes = useClassNames("instagram-handle-input", className);

  const onInvalid = useCallback((value: string) => {
    if (value.includes(" ")) {
      return "Instagram handles cannot contain spaces";
    }
    if (value.length > 30 || value.length < 3) {
      return "Instagram handles must be between 3 and 30 characters";
    }
    if (InputPatterns.capitalAlphabetsRegex.test(value)) {
      return "Instagram handles cannot contain capital letters";
    }
    if (InputPatterns.instagramHandleValidator.test(value)) {
      return "Instagram handles can only contain letters, numbers, periods, and underscores";
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);

  return (
    <SocialMediaHandleInput
      feedback
      className={classes}
      feedbackText={feedback}
      placeholder="Instagram Handle"
      IconFilled={InstagramColored}
      IconStroked={InstagramStroked}
      onValidityChange={onValidityChange}
      pattern={InputPatterns.instagramHandle}
      {...rest}
    />
  );
};
