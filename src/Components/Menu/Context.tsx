import {
  createContext,
  createRef,
  RefObject,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController } from "@figliolia/react-hooks";
import { ListBoxControls, ListElement } from "Components/ListBox";
import { useReactScheduler } from "Hooks/useReactScheduler";
import {
  KeyboardListFocusEvent,
  ListItem,
  ListOrientation,
} from "Tools/KeyboardNavigableList";
import { OptionalChildren } from "Types/React";
import { MenuController } from "./MenuController";
import { IMenuContext } from "./types";

export const MenuContext = createContext<IMenuContext<any, any>>({
  focusInside: false,
  focusedID: undefined,
  focusedIndex: -1,
  setFocusInside: () => {},
  queueTask: () => {},
  menu: createRef<ListElement<any>>(),
  menuController: new MenuController("horizontal"),
});

export const useMenuContext = <
  T extends "ul" | "ol" = "ol",
  I extends ListItem = ListItem,
>() => {
  return use(MenuContext) as IMenuContext<T, I>;
};

export const MenuProvider = <
  T extends "ul" | "ol" = "ol",
  I extends ListItem = ListItem,
>({
  items,
  children,
  controller,
  orientation,
}: Props<I>) => {
  const queueTask = useReactScheduler();
  const menu = useRef<ListElement<T>>(null);
  const [focusedID, setFocusedID] = useState<string>();
  const [focusInside, setFocusInside] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuController = useController(new MenuController<I>(orientation));
  menuController.setScope(items, orientation);

  const enter = useCallback(() => {
    menuController.enterControls();
    setFocusInside(true);
  }, [menuController]);

  const exit = useCallback(() => {
    menuController.destroy();
    setFocusInside(false);
  }, [menuController]);

  useEffect(() => {
    const ID = menuController.register(({ data }: KeyboardListFocusEvent) => {
      queueTask(() => {
        setFocusedID(data.nodeID);
        setFocusedIndex(data.index);
        if (menu.current && data.nodeID && data.scrollTo) {
          menu.current.querySelector(`#${data.nodeID}`)?.scrollIntoView?.({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });
        }
      });
    });
    return () => {
      menuController.remove(ID);
    };
  }, [menuController, queueTask]);

  useImperativeHandle(
    controller,
    () => ({
      exit,
      enter,
      isActive: menuController.isActive,
      getFocusIndex: menuController.getFocusIndex,
      resetFocusIndex: menuController.resetFocusIndex,
    }),
    [enter, exit, menuController],
  );

  const value = useMemo(
    () => ({
      focusInside,
      focusedID,
      focusedIndex,
      menu,
      menuController,
      setFocusInside,
      queueTask,
    }),
    [focusInside, focusedID, focusedIndex, menuController, queueTask],
  );

  return <MenuContext value={value}>{children}</MenuContext>;
};

interface Props<I extends ListItem = ListItem> extends OptionalChildren {
  items: I[];
  orientation: ListOrientation;
  controller: RefObject<ListBoxControls | null>;
}
