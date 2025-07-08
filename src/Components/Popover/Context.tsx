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
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const PopoverContext = createContext<IPopoverContext>({
  visible: false,
  triggerID: "-1",
  popoverID: "-1",
  togglePopover: () => {},
  targetRef: createRef(),
  toggle: new PopoverToggle(
    () => {},
    () => {},
  ),
});

export const PopoverProvider = ({ children }: OptionalChildren) => {
  const triggerID = useId();
  const popoverID = useId();
  const [visible, setVisible] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

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

interface IPopoverContext {
  visible: boolean;
  triggerID: string;
  popoverID: string;
  toggle: PopoverToggle;
  togglePopover: Callback;
  targetRef: RefObject<HTMLButtonElement | null>;
}
