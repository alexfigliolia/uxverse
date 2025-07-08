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
import { PopoverToggle } from "@figliolia/modal-stack";
import { withPopoverContext } from "HOCs/WithPopoverContext";
import { Callback } from "Types/Generics";
import { SVGComponent } from "Types/React";
import { FeedBack, InputValidity } from "./Feedback";
import "./styles.scss";

export const Input = withPopoverContext(
  ({
    value,
    onBlur,
    onFocus,
    onInput,
    label,
    feedbackText,
    placeholder,
    feedback,
    className,
    IconStroked,
    IconFilled,
    children,
    inputPrefix,
    onValidityChange,
    ...rest
  }: Props) => {
    const input = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const popoverToggle = useRef<PopoverToggle>(null);
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

    useEffect(() => {
      if (!input.current) {
        return;
      }
      onValidityChange?.(valid, input.current.value);
    }, [valid, onValidityChange]);

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
          setValid(nextState);
        }
        if (nextState === "INVALID") {
          onValidityChange?.("INVALID", input.current?.value ?? "");
        } else {
          popoverToggle?.current?.close?.(false);
        }
      },
      [valid, onInput, getValidity, onValidityChange],
    );

    const focusInput = useCallback(() => {
      input?.current?.focus?.();
    }, []);

    const feedbackClass = useMemo(() => valid.toLowerCase(), [valid]);

    const classes = useClassNames("visitor-input", className, feedbackClass, {
      focused,
    });

    return (
      <div className={classes}>
        <div role="button" onClick={focusInput} className="visitor-input__icon">
          <IconStroked aria-hidden />
          <IconFilled aria-hidden />
        </div>
        {inputPrefix}
        <input
          ref={input}
          {...rest}
          value={value}
          onBlur={onBlurInternal}
          onFocus={onFocusInternal}
          onInput={onInputInternal}
          title={label || placeholder}
          placeholder={label || placeholder}
        />
        {children}
        {feedback && (
          <FeedBack text={feedbackText} valid={valid} ref={popoverToggle} />
        )}
      </div>
    );
  },
);

export type Props = HTMLProps<HTMLInputElement> & {
  className?: string;
  inputPrefix?: ReactNode;
  IconStroked: SVGComponent;
  IconFilled: SVGComponent;
  onValidityChange?: Callback<[InputValidity, string]>;
} & (
    | {
        feedback: true;
        feedbackText: string;
      }
    | { feedback: never; feedbackText: never }
  );
