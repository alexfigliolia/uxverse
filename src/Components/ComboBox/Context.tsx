import {
  createContext,
  createRef,
  use,
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
  focusedItem: undefined,
  controller: createRef(),
  containerRef: createRef(),
  setFocusedItem: () => {},
  popoverState: defaultPopoverContextValue,
});

export const ComboBoxContextProvider = withPopoverContext(
  ({ children }: OptionalChildren) => {
    const popoverState = use(PopoverContext);
    const controller = useRef<ListBoxControls>(null);
    const containerRef = useRef<HTMLLabelElement>(null);
    const [focusedItem, setFocusedItem] = useState<string>();

    const value = useMemo(
      () => ({
        controller,
        containerRef,
        popoverState,
        focusedItem,
        setFocusedItem,
      }),
      [popoverState, focusedItem],
    );

    return <ComboBoxContext value={value}>{children}</ComboBoxContext>;
  },
);

export const withComboBoxContext = WithContextProvider(ComboBoxContextProvider);
