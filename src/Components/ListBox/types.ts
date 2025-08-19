import {
  Dispatch,
  HTMLProps,
  MouseEvent,
  ReactNode,
  RefCallback,
  RefObject,
  SetStateAction,
} from "react";
import { Callback } from "Types/Generics";
import { ListBoxController } from "./ListBoxController";

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
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
> extends Omit<HTMLProps<ListElement<T>>, "role" | "children"> {
  Tag: T;
  items: I[];
  multiple?: M;
  selections: SelectionSet<M>;
  orientation?: ListBoxOrientation;
  renderItem: ListBoxChildrenFN<I>;
  triggerRef?: RefObject<E | null>;
  onSelection: OnListBoxSelectionFN<M>;
  controller: ListBoxControllerRef;
  onItemFocused?: Callback<[string | undefined, number]>;
  onItemClick?: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}

export type OnListBoxSelectionFN<M extends boolean = false> = Callback<
  [SelectionSet<M>, SelectionOrigin]
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
  : string | number | undefined;

export interface ListBoxControls {
  exit: Callback;
  enter: Callback;
  resetFocusIndex: Callback;
  isActive: Callback<never[], boolean>;
  getFocusIndex: Callback<never[], number>;
}

export interface ListBoxItem {
  id: string | number;
}

export type ListBoxEvents<M extends boolean = false> =
  | ListBoxFocusEvent
  | ListBoxSelectionEvent<M>;

export interface ListBoxFocusEvent {
  event: "focus";
  data: {
    index: number;
    nodeID: string | undefined;
    scrollTo: boolean;
  };
}

export interface ListBoxSelectionEvent<M extends boolean = false> {
  event: "selection";
  data: {
    selections: SelectionSet<M>;
    origin: SelectionOrigin;
  };
}

export type ListBoxOrientation = "horizontal" | "vertical";

export interface IListBoxContext<
  T extends "ul" | "ol" = "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
> {
  focusInside: boolean;
  focusedID: string | undefined;
  focusedIndex: number;
  queueTask: Callback<[Callback]>;
  listbox: RefObject<ListElement<T> | null>;
  listController: ListBoxController<I, M>;
  setFocusInside: Dispatch<SetStateAction<boolean>>;
}

export type SelectionOrigin = "mouse" | "keyboard";

export type ListBoxControllerRef =
  | RefObject<ListBoxControls | null>
  | RefCallback<ListBoxControls | null>;
