import { ListItem, ListOrientation } from "Tools/KeyboardNavigableList";
import { MenuProvider } from "./Context";
import { MenuComponent } from "./Menu";
import { Props } from "./types";

export function Menu<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, E>) {
  return (
    <MenuProvider<T, I>
      items={props.items}
      controller={props.controller}
      orientation={props.orientation as ListOrientation}>
      <MenuComponent {...props} />
    </MenuProvider>
  );
}

export * from "./MenuController";
export * from "./types";
