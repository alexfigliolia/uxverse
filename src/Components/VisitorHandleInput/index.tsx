import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Props } from "Components/FullNameInput";
import { Input } from "Components/Input";
import { useInputValidity } from "Hooks/useInputValidity";
import { AtIcon } from "Icons/At";
import { InputPatterns } from "Tools/InputPatterns";
import "./styles.scss";

export const VisitorHandleInput = ({ className, ...rest }: Props) => {
  const classes = useClassNames("handle-input", className);

  const onInvalid = useCallback((value: string) => {
    if (value.includes(" ")) {
      return "Visitor handles cannot contain spaces";
    }
    if (value.length > 30 || value.length < 4) {
      return "Visitor handles must be between 4 and 30 characters";
    }
    if (InputPatterns.languageAgnosticAlphaNumberic.test(value)) {
      return "Visitor handles cannot contain special characters";
    }
  }, []);

  const { feedback, onValidityChange } = useInputValidity(onInvalid);
  return (
    <Input
      feedback
      required
      type="text"
      spellCheck={false}
      className={classes}
      IconFilled={AtIcon}
      IconStroked={AtIcon}
      feedbackText={feedback}
      onValidityChange={onValidityChange}
      pattern={InputPatterns.visitorHandle}
      {...rest}
    />
  );
};
