"use client";
import { FocusEvent, useCallback, useRef } from "react";
import { ListBox, Props } from "Components/ListBox";
import { useMergedRefs } from "Hooks/useMergedRefs";
import {
  KeyboardNavigableListControls,
  ListElement,
  ListItem,
} from "Tools/KeyboardNavigableList";

export const FocusableListBox = <
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>({
  onBlur,
  onFocus,
  controllerRef,
  ...rest
}: Omit<Props<T, I, M, E>, "tabIndex">) => {
  const mousing = useRef(false);
  const ctrl = useRef<KeyboardNavigableListControls>(null);

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

  const ctrlRef = useMergedRefs(ctrl, controllerRef);

  return (
    <ListBox
      tabIndex={0}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      controllerRef={ctrlRef}
      onFocus={onFocusInternal}
      onBlur={onBlurInternal}
      {...rest}
    />
  );
};
