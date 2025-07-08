import { useCallback, useMemo, useState } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import { InputValidity } from "Components/Input/Feedback";
import { Callback } from "Types/Generics";

export const useInputValidity = (
  onInvalid: Callback<[string], string | undefined>,
) => {
  const timeout = useTimeout();
  const [feedback, setFeedback] = useState("");

  const onValidityChange = useCallback(
    (state: InputValidity, value: string) => {
      if (state !== "INVALID") {
        return timeout.execute(() => setFeedback(""), 250);
      }
      const message = onInvalid(value);
      if (message) {
        setFeedback(message);
      }
    },
    [timeout, onInvalid],
  );

  return useMemo(
    () => ({ feedback, setFeedback, onValidityChange }),
    [feedback, setFeedback, onValidityChange],
  );
};
