"use client";
import { useCallback, useRef } from "react";
import { SearchSquare } from "Icons/SearchSquare";
import { Propless } from "Types/React";
import "./styles.scss";

export const SearchInput = (_: Propless) => {
  const input = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    input.current?.focus?.();
  }, []);

  return (
    <div className="explore-search-input">
      <button onClick={onClick}>
        <SearchSquare aria-hidden />
        <SearchSquare aria-hidden />
      </button>
      <input ref={input} type="search" placeholder="Search Anything" />
    </div>
  );
};
