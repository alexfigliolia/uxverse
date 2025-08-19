import {
  HTMLProps,
  MouseEvent,
  ReactNode,
  RefCallback,
  RefObject,
} from "react";
import {
  KeyboardControllerRef,
  KeyboardListFocusEvent,
  ListElement,
  ListItem,
  ListOrientation,
} from "Tools/KeyboardNavigableList";
import { Callback } from "Types/Generics";

export interface ListBoxItemProps
  extends Omit<
    HTMLProps<HTMLLIElement>,
    "id" | "role" | "ref" | "aria-selected" | "onClick"
  > {
  ref: RefCallback<string>;
  selected: boolean;
  listItemID: string | number;
  onClick: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}

export interface Props<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
> extends Omit<HTMLProps<ListElement<T>>, "role" | "children"> {
  Tag: T;
  items: I[];
  multiple?: M;
  selections: SelectionSet<M>;
  orientation?: ListOrientation;
  renderItem: ListBoxChildrenFN<I>;
  triggerRef?: RefObject<E | null>;
  onSelection: OnListBoxSelectionFN<M>;
  controllerRef: KeyboardControllerRef;
  onItemFocused?: Callback<[string | undefined, number]>;
  onItemClick?: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}

export type OnListBoxSelectionFN<M extends boolean = false> = Callback<
  [SelectionSet<M>, SelectionOrigin]
>;

export type ListBoxChildrenFN<I extends ListItem = ListItem> = Callback<
  [I, number, I[]],
  ReactNode
>;

export type SelectionSet<M extends boolean = false> = M extends true
  ? Set<string | number>
  : string | number | undefined;

export type ListBoxEvents<M extends boolean = false> =
  | KeyboardListFocusEvent
  | ListBoxSelectionEvent<M>;

export interface ListBoxSelectionEvent<M extends boolean = false> {
  event: "selection";
  data: {
    selections: SelectionSet<M>;
    origin: SelectionOrigin;
  };
}

export type SelectionOrigin = "mouse" | "keyboard";
