"use client";
import {
  ChangeEventHandler,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
import { SearchSquare } from "Icons/SearchSquare";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const SearchInput = ({ ref, onChange }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    input.current?.focus?.();
  }, []);

  useImperativeHandle(ref, () => onClick, [onClick]);

  return (
    <label className="explore-search-input">
      <VisuallyHiddenText Tag="span">Search anything</VisuallyHiddenText>
      <button onClick={onClick}>
        <SearchSquare aria-hidden />
        <SearchSquare aria-hidden />
      </button>
      <input
        ref={input}
        type="search"
        onChange={onChange}
        placeholder="Search Anything"
      />
    </label>
  );
};

interface Props {
  ref?: RefObject<Callback | null>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
