import {
  createContext,
  createRef,
  RefObject,
  use,
  useCallback,
  useId,
  useMemo,
  useRef,
} from "react";
import { PopoverToggle } from "@figliolia/modal-stack";
import { useBasicPopoverToggle } from "Hooks/useBasicPopoverToggle";
import { WithContextProvider } from "Tools/WithContextProvider";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const defaultPopoverContextValue = {
  visible: false,
  triggerID: "-1",
  popoverID: "-1",
  togglePopover: () => {},
  toggle: new PopoverToggle(
    () => {},
    () => {},
  ),
  triggerRef: createRef<HTMLElement | null>(),
};

export const PopoverContext = createContext<IPopoverContext>(
  defaultPopoverContextValue,
);

export const PopoverProvider = <T extends HTMLElement = HTMLElement>({
  children,
}: OptionalChildren) => {
  const triggerID = useId();
  const popoverID = useId();
  const triggerRef = useRef<T>(null);
  const { open: visible, toggle } = useBasicPopoverToggle();

  const togglePopover = useCallback(() => {
    if (toggle.isOpen) {
      return toggle.close();
    }
    toggle.open();
  }, [toggle]);

  const value = useMemo(
    () => ({
      visible,
      toggle,
      togglePopover,
      triggerID,
      popoverID,
      triggerRef,
    }),
    [visible, toggle, togglePopover, triggerID, popoverID],
  );

  return <PopoverContext value={value}>{children}</PopoverContext>;
};

export interface IPopoverContext<T extends HTMLElement = HTMLElement> {
  visible: boolean;
  triggerID: string;
  popoverID: string;
  toggle: PopoverToggle;
  togglePopover: Callback;
  triggerRef: RefObject<T | null>;
}

export const withPopoverContext = WithContextProvider(PopoverProvider);

export const useButtonPopover = () => {
  return use(PopoverContext) as IPopoverContext<HTMLButtonElement>;
};
