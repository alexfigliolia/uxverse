import { Dispatch, RefObject, SetStateAction } from "react";
import { PopoverToggle } from "@figliolia/modal-stack";
import { ListBoxControls } from "Components/ListBox";
import { IPopoverContext } from "Components/Popover";
import { Callback } from "Types/Generics";

export interface IComboBoxContext {
  focusedItem: string | undefined;
  popoverState: IPopoverContext<HTMLElement>;
  controller: RefObject<ListBoxControls | null>;
  containerRef: RefObject<HTMLLabelElement | null>;
  setFocusedItem: Dispatch<SetStateAction<string | undefined>>;
}

export interface ComboBoxControls {
  focusInput: Callback;
  toggle: PopoverToggle;
  setInputValue: Callback<[string]>;
}
