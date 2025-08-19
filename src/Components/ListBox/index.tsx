import { ListItem, ListOrientation } from "Tools/KeyboardNavigableList";
import { ListBoxProvider } from "./Context";
import { ListBoxComponent } from "./ListBox";
import { Props } from "./types";

export function ListBox<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, M, E>) {
  return (
    <ListBoxProvider<T, I, M>
      items={props.items}
      controller={props.controller}
      selections={props.selections}
      multiple={props.multiple as M}
      orientation={props.orientation as ListOrientation}>
      <ListBoxComponent {...props} />
    </ListBoxProvider>
  );
}

export * from "./ListBoxController";
export * from "./types";
