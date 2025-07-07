"use client";
import {
  FocusEvent,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const Input = ({
  value,
  onFocus,
  onBlur,
  className,
  IconStroked,
  IconFilled,
  children,
  ...rest
}: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [populated, setPopulated] = useState(!!value);

  useEffect(() => {
    setTimeout(() => {
      setPopulated(!!input.current?.value?.length);
    }, 0);
  }, []);

  useEffect(() => {
    setPopulated(!!value);
  }, [value]);

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
    },
    [onBlur],
  );

  const focusInput = useCallback(() => {
    input?.current?.focus?.();
  }, []);

  const classes = useClassNames("visitor-input", className, {
    focused,
    populated,
  });

  return (
    <label className={classes}>
      <button type="button" onClick={focusInput} tabIndex={-1}>
        <IconStroked aria-hidden />
        <IconFilled aria-hidden />
      </button>
      <input
        ref={input}
        {...rest}
        value={value}
        onBlur={onBlurInternal}
        onFocus={onFocusInternal}
      />
      {children}
    </label>
  );
};

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
  IconStroked: SVGComponent;
  IconFilled: SVGComponent;
}
