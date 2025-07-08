"use client";
import { useCallback } from "react";
import { Input, Props as InputProps } from "Components/Input";
import { useInputValidity } from "Hooks/useInputValidity";
import { UserFilled, UserStroked } from "Icons/User";
import { InputPatterns } from "Tools/InputPatterns";

export const FullNameInput = ({ className, ...rest }: Props) => {
  const onInvalid = useCallback((value: string) => {
    if (value.startsWith(" ") || value.endsWith(" ")) {
      return "Names cannot begin or end with a space";
    }
    if (InputPatterns.languageAgnosticAlphabets.test(value)) {
      return "Names may not contain numbers or special characters";
    }
    const tokens = value.split(" ");
    for (const token of tokens) {
      if (token.length < 2) {
        return "Name segments must be at least two characters";
      }
      if (token.length > 30) {
        return "Name segments must be less than 31 characters";
      }
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);

  return (
    <Input
      feedback
      type="text"
      className={className}
      spellCheck={false}
      feedbackText={feedback}
      IconFilled={UserFilled}
      IconStroked={UserStroked}
      pattern={InputPatterns.fullName}
      onValidityChange={onValidityChange}
      {...rest}
    />
  );
};

export type Props = Omit<
  InputProps,
  | "IconFilled"
  | "IconStroked"
  | "pattern"
  | "feedback"
  | "feedbackText"
  | "type"
  | "spellCheck"
>;
