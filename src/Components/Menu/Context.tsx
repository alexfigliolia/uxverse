import { use } from "react";
import {
  IContext,
  KeyboardNavigableListContext,
  ListItem,
} from "Tools/KeyboardNavigableList";
import { MenuController } from "./MenuController";

export const useMenuContext = <I extends ListItem>() => {
  return use(KeyboardNavigableListContext) as IContext<MenuController<I>>;
};
