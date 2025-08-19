import { use } from "react";
import {
  IContext,
  KeyboardNavigableListContext,
  ListItem,
} from "Tools/KeyboardNavigableList";
import { ListBoxController } from "./ListBoxController";

export const useListBoxContext = <
  I extends ListItem = ListItem,
  M extends boolean = false,
>() => {
  return use(KeyboardNavigableListContext) as IContext<ListBoxController<I, M>>;
};
