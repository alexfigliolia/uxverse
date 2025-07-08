"use client";
import { useCallback, useState } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import { Input, Props } from "Components/Input";
import { InputValidity } from "Components/Input/Feedback";
import { UserFilled, UserStroked } from "Icons/User";
import { InputPatterns } from "Tools/InputPatterns";

export const FullNameInput = ({
  className,
  ...rest
}: Omit<
  Props,
  | "IconFilled"
  | "IconStroked"
  | "pattern"
  | "feedback"
  | "feedbackText"
  | "type"
  | "spellCheck"
>) => {
  const timeout = useTimeout();
  const [feedback, setFeedback] = useState("");

  const onValidityChange = useCallback(
    (state: InputValidity, value: string) => {
      if (state !== "INVALID") {
        return timeout.execute(() => setFeedback(""), 250);
      }
      if (value.startsWith(" ") || value.endsWith(" ")) {
        return setFeedback("Names cannot begin or end with a space");
      }
      if (new RegExp(/[^\p{L}]+/gu).test(value)) {
        return setFeedback("Names may not contain special characters");
      }
      const tokens = value.split(" ");
      for (const token of tokens) {
        if (token.length < 2) {
          return setFeedback("Name segments must be at least two characters");
        }
        if (token.length > 30) {
          return setFeedback("Name segments must be less than 30 characters");
        }
      }
    },
    [timeout],
  );

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
