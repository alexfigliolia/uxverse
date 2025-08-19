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
  ListElement,
} from "Components/ListBox";
import { ListItem, ListOrientation } from "Tools/KeyboardNavigableList";
import { Callback } from "Types/Generics";
import { MenuController } from "./MenuController";

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
  controller: RefObject<ListBoxControls | null>;
  onItemFocused?: Callback<[string | undefined, number]>;
  onItemClick?: Callback<[string | number, MouseEvent<HTMLLIElement>]>;
}

export interface IMenuContext<
  T extends "ul" | "ol" = "ol",
  I extends ListItem = ListItem,
> {
  focusInside: boolean;
  focusedID: string | undefined;
  focusedIndex: number;
  queueTask: Callback<[Callback]>;
  menu: RefObject<ListElement<T> | null>;
  menuController: MenuController<I>;
  setFocusInside: Dispatch<SetStateAction<boolean>>;
}
