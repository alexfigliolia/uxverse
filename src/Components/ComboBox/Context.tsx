import {
  createContext,
  createRef,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ListBoxControls } from "Components/ListBox";
import {
  defaultPopoverContextValue,
  PopoverContext,
  withPopoverContext,
} from "Components/Popover";
import { WithContextProvider } from "Tools/WithContextProvider";
import { OptionalChildren } from "Types/React";
import { IComboBoxContext } from "./types";

export const ComboBoxContext = createContext<IComboBoxContext>({
  focusedID: undefined,
  listBoxFocused: false,
  input: createRef(),
  container: createRef(),
  controller: createRef(),
  setFocusedID: () => {},
  enterListBox: () => {},
  exitListBox: () => {},
  resetListBoxFocusIndex: () => {},
  popoverState: defaultPopoverContextValue,
});

export const ComboBoxContextProvider = withPopoverContext(
  ({ children }: OptionalChildren) => {
    const popoverState = use(PopoverContext);
    const input = useRef<HTMLInputElement>(null);
    const container = useRef<HTMLLabelElement>(null);
    const controller = useRef<ListBoxControls>(null);
    const [focusedID, setFocusedID] = useState<string>();
    const [listBoxFocused, setListBoxFocused] = useState(false);

    const { visible } = popoverState;

    const enterListBox = useCallback(() => {
      controller.current?.enter?.();
      setListBoxFocused(true);
    }, []);

    const exitListBox = useCallback(() => {
      controller.current?.exit?.();
      setListBoxFocused(false);
    }, []);

    const resetListBoxFocusIndex = useCallback(() => {
      controller?.current?.resetFocusIndex?.();
    }, []);

    useEffect(() => {
      if (!visible) {
        exitListBox();
      }
    }, [visible, exitListBox]);

    const value = useMemo(
      () => ({
        input,
        focusedID,
        container,
        controller,
        setFocusedID,
        popoverState,
        listBoxFocused,
        enterListBox,
        exitListBox,
        resetListBoxFocusIndex,
      }),
      [
        focusedID,
        popoverState,
        enterListBox,
        exitListBox,
        listBoxFocused,
        resetListBoxFocusIndex,
      ],
    );

    return <ComboBoxContext value={value}>{children}</ComboBoxContext>;
  },
);

export const withComboBoxContext = WithContextProvider(ComboBoxContextProvider);
