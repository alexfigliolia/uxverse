import { HTMLProps, MouseEvent, RefObject } from "react";
import { ListBoxChildrenFN } from "Components/ListBox";
import {
  KeyboardControllerRef,
  ListElement,
  ListItem,
  ListOrientation,
} from "Tools/KeyboardNavigableList";
import { Callback } from "Types/Generics";

export interface Props<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  E extends HTMLElement = HTMLElement,
> extends Omit<HTMLProps<ListElement<T>>, "role" | "children"> {
  Tag: T;
  items: I[];
  orientation?: ListOrientation;
  renderItem: ListBoxChildrenFN<I>;
  triggerRef?: RefObject<E | null>;
  controllerRef: KeyboardControllerRef;
  onItemFocused?: Callback<[string | undefined, number]>;
  onItemClick?: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}
