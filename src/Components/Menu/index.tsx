import { ListBoxItem, ListBoxOrientation } from "Components/ListBox";
import { MenuProvider } from "./Context";
import { MenuComponent } from "./Menu";
import { Props } from "./types";

export function Menu<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  E extends HTMLElement = HTMLElement,
>(props: Props<T, I, E>) {
  return (
    <MenuProvider<T, I>
      items={props.items}
      controller={props.controller}
      orientation={props.orientation as ListBoxOrientation}>
      <MenuComponent {...props} />
    </MenuProvider>
  );
}

export * from "./MenuController";
export * from "./types";
