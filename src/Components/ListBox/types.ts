import {
  HTMLProps,
  MouseEventHandler,
  ReactNode,
  RefCallback,
  RefObject,
} from "react";
import { Callback } from "Types/Generics";

export interface ListBoxItemProps
  extends Omit<
    HTMLProps<HTMLLIElement>,
    "id" | "role" | "ref" | "aria-selected"
  > {
  ref: RefCallback<string>;
  selected: boolean;
}

export interface Props<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
> extends Omit<HTMLProps<ListElement<T>>, "role" | "children"> {
  Tag: T;
  items: I[];
  multiple?: M;
  selections: SelectionSet<M>;
  orientation?: ListBoxOrientation;
  renderItem: ListBoxChildrenFN<I>;
  onSelection: OnListBoxSelectionFN<M>;
  controller: RefObject<ListBoxControls | null>;
  onItemFocused?: Callback<[string | undefined]>;
  onItemClick?: MouseEventHandler<HTMLLIElement>;
}

export type OnListBoxSelectionFN<M extends boolean = false> = Callback<
  [SelectionSet<M>]
>;

export type ListBoxChildrenFN<I extends ListBoxItem = ListBoxItem> = Callback<
  [I, number, I[]],
  ReactNode
>;

export type ListElement<T extends "ul" | "ol"> = T extends "ul"
  ? HTMLUListElement
  : HTMLOListElement;

export type SelectionSet<M extends boolean = false> = M extends true
  ? Set<string | number>
  : string | number;

export interface ListBoxControls {
  exit: Callback;
  enter: Callback;
  resetFocus: Callback;
  getMappedKeys: Callback<[], Set<string>>;
}

export interface ListBoxItem {
  id: string | number;
}

export type ListBoxEvents<M extends boolean = false> =
  | ListBoxFocusEvent
  | ListBoxSelectionEvent<M>;

export interface ListBoxFocusEvent {
  event: "focus";
  data: { index: number; nodeID: string | undefined };
}

export interface ListBoxSelectionEvent<M extends boolean = false> {
  event: "selection";
  data: SelectionSet<M>;
}

export type ListBoxOrientation = "horizontal" | "vertical";
