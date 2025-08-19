import { useCallback } from "react";
import {
  KeyboardNavigableListProvider,
  ListItem,
} from "Tools/KeyboardNavigableList";
import { ListBoxComponent } from "./ListBox";
import { ListBoxController } from "./ListBoxController";
import { Props } from "./types";

export function ListBox<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, M, E>) {
  const createInstance = useCallback(
    () =>
      new ListBoxController<I, M>(
        props.selections,
        props.multiple,
        props.orientation,
      ),
    [props],
  );
  const setScope = useCallback(
    (controller: ListBoxController<I, M>) => {
      controller.setScope(
        props.items,
        props.selections,
        props.orientation ?? "vertical",
      );
    },
    [props],
  );
  return (
    <KeyboardNavigableListProvider<ListBoxController<I, M>>
      setScope={setScope}
      createInstance={createInstance}
      controllerRef={props.controllerRef}>
      <ListBoxComponent {...props} />
    </KeyboardNavigableListProvider>
  );
}

export * from "./ListBoxController";
export * from "./types";
