"use client";
import { ChangeEventHandler, useCallback, useRef } from "react";
import { VisuallyHiddenText } from "Components/VisuallyHiddenText";
import { SearchSquare } from "Icons/SearchSquare";
import "./styles.scss";

export const SearchInput = ({ onChange }: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    input.current?.focus?.();
  }, []);

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
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
