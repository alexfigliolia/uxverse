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
import {
  ListBoxControls,
  ListBoxFocusEvent,
  ListBoxItem,
  ListBoxOrientation,
  ListElement,
} from "Components/ListBox";
import { useReactScheduler } from "Hooks/useReactScheduler";
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
  I extends ListBoxItem = ListBoxItem,
>() => {
  return use(MenuContext) as IMenuContext<T, I>;
};

export const MenuProvider = <
  T extends "ul" | "ol" = "ol",
  I extends ListBoxItem = ListBoxItem,
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
    menuController.enterMenu();
    setFocusInside(true);
  }, [menuController]);

  const exit = useCallback(() => {
    menuController.destroy();
    setFocusInside(false);
  }, [menuController]);

  useEffect(() => {
    const ID = menuController.register(({ data }: ListBoxFocusEvent) => {
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

interface Props<I extends ListBoxItem = ListBoxItem> extends OptionalChildren {
  items: I[];
  orientation: ListBoxOrientation;
  controller: RefObject<ListBoxControls | null>;
}
