import {
  createContext,
  createRef,
  RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { PopoverToggle, usePopoverToggle } from "@figliolia/modal-stack";
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
  targetRef: createRef<HTMLElement | null>(),
};

export const PopoverContext = createContext<IPopoverContext>(
  defaultPopoverContextValue,
);

export const PopoverProvider = <T extends HTMLElement = HTMLElement>({
  children,
}: OptionalChildren) => {
  const triggerID = useId();
  const popoverID = useId();
  const targetRef = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  const openPopover = useCallback(() => {
    setVisible(true);
  }, []);

  const closePopover = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = usePopoverToggle(openPopover, closePopover);

  const togglePopover = useCallback(() => {
    if (toggle.isOpen) {
      return toggle.close();
    }
    toggle.open();
  }, [toggle]);

  const value = useMemo(
    () => ({ visible, toggle, togglePopover, triggerID, popoverID, targetRef }),
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
  targetRef: RefObject<T | null>;
}

export const withPopoverContext = WithContextProvider(PopoverProvider);
