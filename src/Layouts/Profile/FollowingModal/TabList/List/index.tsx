"use client";
import {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FocusableListBox } from "Components/FocusableListBox";
import {
  ListBoxChildrenFN,
  ListBoxControls,
  OnListBoxSelectionFN,
} from "Components/ListBox";
import { SearchInput } from "Components/SearchInput";
import { IUser } from "Layouts/Profile/FollowingContext";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const List = ({
  items,
  onSearch,
  "aria-hidden": ariaHidden,
  ...rest
}: Props) => {
  const node = useRef<HTMLOListElement>(null);
  const controller = useRef<ListBoxControls>(null);

  const scrollToTop = useCallback((behavior: "instant" | "smooth") => {
    requestAnimationFrame(() => {
      node.current
        ?.closest(".sheet-scroll-view")
        ?.scrollTo?.({ top: 0, behavior });
    });
  }, []);

  const onFocus = useCallback(() => {
    scrollToTop("instant");
  }, [scrollToTop]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  useEffect(() => {
    if (ariaHidden) {
      controller.current?.exit?.();
    }
  }, [ariaHidden, controller]);

  return (
    <div className="user-list">
      <FocusableListBox
        ref={node}
        Tag="ol"
        selections=""
        items={items}
        onFocus={onFocus}
        aria-hidden={ariaHidden}
        controller={controller}
        {...rest}
      />
      <search>
        <SearchInput onChange={onChange} />
      </search>
    </div>
  );
};

interface Props extends HTMLAttributes<HTMLOListElement> {
  items: IUser[];
  onSearch: Callback<[string]>;
  renderItem: ListBoxChildrenFN<IUser>;
  onSelection: OnListBoxSelectionFN<false>;
}
