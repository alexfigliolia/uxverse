"use client";
import {
  ChangeEvent,
  HTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";
import { OptionalChildren } from "Types/React";
import { PostInput } from "../PostInput";
import "./styles.scss";

export const TextArea = ({
  className,
  onChange,
  value: propValue,
  defaultValue,
  ...rest
}: Props) => {
  const [value, setValue] = useState(propValue || defaultValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const onTextInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange],
  );

  return (
    <PostInput className={className}>
      <div className="dummy" aria-hidden>
        {value}
      </div>
      <textarea {...rest} value={propValue} onChange={onTextInput}></textarea>
    </PostInput>
  );
};

interface Props extends OptionalChildren, HTMLProps<HTMLTextAreaElement> {}
