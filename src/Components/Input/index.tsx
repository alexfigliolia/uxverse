"use client";
import {
  FocusEvent,
  FormEvent,
  HTMLProps,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { CheckCircleStroked } from "Icons/CheckCircle";
import { WarningStroked } from "Icons/Warning";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const Input = ({
  value,
  onBlur,
  onFocus,
  onInput,
  feedback,
  className,
  IconStroked,
  IconFilled,
  children,
  inputPrefix,
  ...rest
}: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState<InputValidity>("UNKNOWN");

  const getValidity = useCallback(() => {
    if (!input.current || !input.current.value.length) {
      return "UNKNOWN";
    }
    return input.current.checkValidity() ? "VALID" : "INVALID";
  }, []);

  const setValidityState = useCallback(() => {
    if (!input.current) {
      return;
    }
    setValid(getValidity());
  }, [getValidity]);

  useEffect(() => {
    setValidityState();
  }, [setValidityState]);

  const onFocusInternal = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );
  const onBlurInternal = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
      setValidityState();
    },
    [onBlur, setValidityState],
  );

  const onInputInternal = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      onInput?.(e);
      const nextState = getValidity();
      if (
        (nextState === "VALID" && valid !== "VALID") ||
        (valid === "VALID" && nextState !== "VALID") ||
        (valid === "INVALID" && nextState !== "INVALID")
      ) {
        return setValid(nextState);
      }
    },
    [valid, onInput, getValidity],
  );

  const focusInput = useCallback(() => {
    input?.current?.focus?.();
  }, []);

  const feedbackClass = useMemo(() => valid.toLowerCase(), [valid]);

  const classes = useClassNames("visitor-input", className, feedbackClass, {
    focused,
  });

  return (
    <label className={classes}>
      <button
        type="button"
        tabIndex={-1}
        onClick={focusInput}
        className="visitor-input__icon">
        <IconStroked aria-hidden />
        <IconFilled aria-hidden />
      </button>
      {inputPrefix}
      <input
        ref={input}
        {...rest}
        value={value}
        onBlur={onBlurInternal}
        onFocus={onFocusInternal}
        onInput={onInputInternal}
      />
      {children}
      {feedback && (
        <button
          type="button"
          aria-hidden={valid !== "INVALID"}
          className="visitor-input__feedback"
          tabIndex={valid === "INVALID" ? 0 : -1}>
          <CheckCircleStroked aria-hidden />
          <WarningStroked aria-hidden />
        </button>
      )}
    </label>
  );
};

export interface Props extends HTMLProps<HTMLInputElement> {
  feedback?: boolean;
  className?: string;
  inputPrefix?: ReactNode;
  IconStroked: SVGComponent;
  IconFilled: SVGComponent;
}

export type InputValidity = "UNKNOWN" | "VALID" | "INVALID";
