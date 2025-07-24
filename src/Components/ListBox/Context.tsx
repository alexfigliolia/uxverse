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
import { useReactScheduler } from "Hooks/useReactScheduler";
import { OptionalChildren } from "Types/React";
import { ListBoxController } from "./ListBoxController";
import {
  IListBoxContext,
  ListBoxControls,
  ListBoxEvents,
  ListBoxFocusEvent,
  ListBoxItem,
  ListBoxOrientation,
  ListElement,
  SelectionSet,
} from "./types";

export const ListBoxContext = createContext<IListBoxContext<any, any, any>>({
  focusInside: false,
  focusedID: undefined,
  focusedIndex: -1,
  setFocusInside: () => {},
  queueTask: () => {},
  listbox: createRef<ListElement<any>>(),
  listController: new ListBoxController(""),
});

export const useListBoxContext = <
  T extends "ul" | "ol" = "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
>() => {
  return use(ListBoxContext) as IListBoxContext<T, I, M>;
};

export const ListBoxProvider = <
  T extends "ul" | "ol" = "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
>({
  items,
  children,
  multiple,
  selections,
  controller,
  orientation,
}: Props<I, M>) => {
  const queueTask = useReactScheduler();
  const listbox = useRef<ListElement<T>>(null);
  const [focusedID, setFocusedID] = useState<string>();
  const [focusInside, setFocusInside] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listController = useController(
    new ListBoxController<I, M>(selections, multiple, orientation),
  );
  listController.setScope(items, selections, orientation);

  const enter = useCallback(() => {
    listController.enterListBox();
    setFocusInside(true);
  }, [listController]);

  const exit = useCallback(() => {
    listController.destroy();
    setFocusInside(false);
  }, [listController]);

  const onFocus = useCallback((data: ListBoxFocusEvent["data"]) => {
    setFocusedID(data.nodeID);
    setFocusedIndex(data.index);
    if (listbox.current && data.nodeID && data.scrollTo) {
      // listbox.current.querySelector(`#${data.nodeID}`)!.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    const ID = listController.register(({ event, data }: ListBoxEvents<M>) => {
      if (event === "focus") {
        queueTask(() => onFocus(data));
      }
    });
    return () => {
      listController.remove(ID);
    };
  }, [listController, onFocus, queueTask]);

  useImperativeHandle(
    controller,
    () => ({
      exit,
      enter,
      resetFocusIndex: listController.resetFocusIndex,
    }),
    [enter, exit, listController],
  );

  const value = useMemo(
    () => ({
      focusInside,
      focusedID,
      focusedIndex,
      listbox,
      listController,
      setFocusInside,
      queueTask,
    }),
    [focusInside, focusedID, focusedIndex, listController, queueTask],
  );

  return <ListBoxContext value={value}>{children}</ListBoxContext>;
};

interface Props<I extends ListBoxItem = ListBoxItem, M extends boolean = false>
  extends OptionalChildren {
  items: I[];
  multiple: M;
  selections: SelectionSet<M>;
  orientation: ListBoxOrientation;
  controller: RefObject<ListBoxControls | null>;
}
