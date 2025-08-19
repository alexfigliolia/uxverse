"use client";
import { FocusEvent, useCallback, useRef } from "react";
import {
  ListBox,
  ListBoxControls,
  ListBoxItem,
  ListElement,
  Props,
} from "Components/ListBox";
import { useMergedRefs } from "Hooks/useMergedRefs";

export const FocusableListBox = <
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>({
  onBlur,
  onFocus,
  controller,
  ...rest
}: Omit<Props<T, I, M, E>, "tabIndex">) => {
  const mousing = useRef(false);
  const ctrl = useRef<ListBoxControls>(null);

  const onMouseDown = useCallback(() => {
    mousing.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    mousing.current = false;
  }, []);

  const onFocusInternal = useCallback(
    (e: FocusEvent<ListElement<T>>) => {
      if (!mousing.current) {
        ctrl.current?.enter?.();
        onFocus?.(e);
      }
    },
    [onFocus],
  );

  const onBlurInternal = useCallback(
    (e: FocusEvent<ListElement<T>>) => {
      ctrl.current?.exit?.();
      onBlur?.(e);
    },
    [onBlur],
  );

  const ctrlRef = useMergedRefs(ctrl, controller);

  return (
    <ListBox
      tabIndex={0}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      controller={ctrlRef}
      onFocus={onFocusInternal}
      onBlur={onBlurInternal}
      {...rest}
    />
  );
};
