import { ListBoxProvider } from "./Context";
import { ListBoxComponent } from "./ListBox";
import { ListBoxItem, ListBoxOrientation, Props } from "./types";

export function ListBox<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, M, E>) {
  return (
    <ListBoxProvider<T, I, M>
      items={props.items}
      controller={props.controller}
      selections={props.selections}
      multiple={props.multiple as M}
      orientation={props.orientation as ListBoxOrientation}>
      <ListBoxComponent {...props} />
    </ListBoxProvider>
  );
}

export * from "./ListBoxController";
export * from "./types";
