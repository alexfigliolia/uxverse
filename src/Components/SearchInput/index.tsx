"use client";
import {
  ChangeEventHandler,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { ScreenReaderOnly } from "Components/ScreenReaderOnly";
import { SearchSquare } from "Icons/SearchSquare";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const SearchInput = ({ ref, onChange, label = "Search" }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    input.current?.focus?.();
  }, []);

  useImperativeHandle(ref, () => onClick, [onClick]);

  return (
    <label className="uxverse-search-input">
      <ScreenReaderOnly Tag="span">{label}</ScreenReaderOnly>
      <button onClick={onClick} onFocus={onClick} tabIndex={-1}>
        <SearchSquare aria-hidden />
        <SearchSquare aria-hidden />
      </button>
      <input
        ref={input}
        type="search"
        onChange={onChange}
        placeholder={label}
      />
    </label>
  );
};

interface Props {
  label?: string;
  ref?: RefObject<Callback | null>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
