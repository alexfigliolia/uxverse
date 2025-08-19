import {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController } from "@figliolia/react-hooks";
import { useReactScheduler } from "Hooks/useReactScheduler";
import { KeyboardNavigableList } from "./KeyboardNavigableList";
import { NullController } from "./NullController";
import {
  IContext,
  IProviderProps,
  KeyboardListFocusEvent,
  ListElement,
} from "./types";

export const KeyboardNavigableListContext = createContext<IContext<any>>({
  focusInside: false,
  focusedID: undefined,
  focusedIndex: -1,
  setFocusInside: () => {},
  queueTask: () => {},
  listElement: createRef<ListElement<any>>(),
  controller: new NullController("horizontal"),
});

export const KeyboardNavigableListProvider = <
  M extends KeyboardNavigableList<any, any>,
>({
  children,
  setScope,
  controllerRef,
  createInstance,
}: IProviderProps<M>) => {
  const queueTask = useReactScheduler();
  const listElement = useRef<ListElement<any>>(null);
  const [focusedID, setFocusedID] = useState<string>();
  const [focusInside, setFocusInside] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const controller = useController(createInstance());
  setScope(controller);

  const enter = useCallback(() => {
    controller.enterControls();
    setFocusInside(true);
  }, [controller]);

  const exit = useCallback(() => {
    controller.destroy();
    setFocusInside(false);
  }, [controller]);

  useEffect(() => {
    const ID = controller.register(
      ({ data, event }: KeyboardListFocusEvent) => {
        if (event === "focus") {
          queueTask(() => {
            setFocusedID(data.nodeID);
            setFocusedIndex(data.index);
            if (listElement.current && data.nodeID && data.scrollTo) {
              listElement.current
                .querySelector(`#${data.nodeID}`)
                ?.scrollIntoView?.({
                  block: "center",
                  inline: "center",
                  behavior: "smooth",
                });
            }
          });
        }
      },
    );
    return () => {
      controller.remove(ID);
    };
  }, [controller, queueTask]);

  useEffect(() => {
    return () => {
      controller.destroy();
    };
  }, [controller]);

  useImperativeHandle(
    controllerRef,
    () => ({
      exit,
      enter,
      isActive: controller.isActive,
      getFocusIndex: controller.getFocusIndex,
      resetFocusIndex: controller.resetFocusIndex,
    }),
    [enter, exit, controller],
  );

  const value = useMemo(
    () => ({
      focusInside,
      focusedID,
      focusedIndex,
      listElement,
      controller,
      setFocusInside,
      queueTask,
    }),
    [focusInside, focusedID, focusedIndex, controller, queueTask],
  );

  return (
    <KeyboardNavigableListContext value={value}>
      {children}
    </KeyboardNavigableListContext>
  );
};
