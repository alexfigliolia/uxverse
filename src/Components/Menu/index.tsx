"use client";
import { useCallback } from "react";
import {
  KeyboardNavigableListProvider,
  ListItem,
} from "Tools/KeyboardNavigableList";
import { MenuComponent } from "./Menu";
import { MenuController } from "./MenuController";
import { Props } from "./types";

export function Menu<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, E>) {
  const createInstance = useCallback(
    () => new MenuController<I>(props.orientation ?? "vertical"),
    [props],
  );
  const setScope = useCallback(
    (controller: MenuController<I>) => {
      controller.setScope(props.items, props.orientation ?? "vertical");
    },
    [props],
  );
  return (
    <KeyboardNavigableListProvider<MenuController<I>>
      setScope={setScope}
      createInstance={createInstance}
      controllerRef={props.controllerRef}>
      <MenuComponent {...props} />
    </KeyboardNavigableListProvider>
  );
}

export * from "./MenuController";
export * from "./types";
