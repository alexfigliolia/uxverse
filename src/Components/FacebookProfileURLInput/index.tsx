"use client";
import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Props } from "Components/FullNameInput";
import { Input } from "Components/Input";
import { useInputValidity } from "Hooks/useInputValidity";
import { FacebookColored, FacebookFilled } from "Icons/Facebook";
import { InputPatterns } from "Tools/InputPatterns";
import "./styles.scss";

export const FacebookProfileURLInput = ({
  className,
  ...rest
}: Omit<Props, "placeholder">) => {
  const classes = useClassNames("facebook-profile-input", className);

  const onInvalid = useCallback((value: string) => {
    if (!InputPatterns.facebookURLValidator.test(value)) {
      return "Please provide your facebook profile URL";
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);

  return (
    <Input
      feedback
      type="url"
      spellCheck={false}
      className={classes}
      feedbackText={feedback}
      placeholder="Facebook Profile URL"
      IconFilled={FacebookColored}
      IconStroked={FacebookFilled}
      onValidityChange={onValidityChange}
      pattern={InputPatterns.facebookURL}
      {...rest}
    />
  );
};
