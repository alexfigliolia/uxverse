import {
  Dispatch,
  HTMLProps,
  MouseEvent,
  RefObject,
  SetStateAction,
} from "react";
import {
  ListBoxChildrenFN,
  ListBoxControls,
  ListBoxItem,
  ListBoxOrientation,
  ListElement,
} from "Components/ListBox";
import { Callback } from "Types/Generics";
import { MenuController } from "./MenuController";

export interface Props<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  E extends HTMLElement = HTMLElement,
> extends Omit<HTMLProps<ListElement<T>>, "role" | "children"> {
  Tag: T;
  items: I[];
  orientation?: ListBoxOrientation;
  renderItem: ListBoxChildrenFN<I>;
  triggerRef?: RefObject<E | null>;
  controller: RefObject<ListBoxControls | null>;
  onItemFocused?: Callback<[string | undefined]>;
  onItemClick?: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}

export interface IMenuContext<
  T extends "ul" | "ol" = "ol",
  I extends ListBoxItem = ListBoxItem,
> {
  focusInside: boolean;
  focusedID: string | undefined;
  focusedIndex: number;
  queueTask: Callback<[Callback]>;
  menu: RefObject<ListElement<T> | null>;
  menuController: MenuController<I>;
  setFocusInside: Dispatch<SetStateAction<boolean>>;
}
