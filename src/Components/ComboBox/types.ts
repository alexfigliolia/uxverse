import { Dispatch, RefObject, SetStateAction } from "react";
import { PopoverToggle } from "@figliolia/modal-stack";
import { IPopoverContext } from "Components/Popover";
import { KeyboardNavigableListControls } from "Tools/KeyboardNavigableList";
import { Callback } from "Types/Generics";

export interface IComboBoxContext {
  focusedID: string | undefined;
  listBoxFocused: boolean;
  enterListBox: Callback;
  exitListBox: Callback;
  resetListBoxFocusIndex: Callback;
  input: RefObject<HTMLInputElement | null>;
  popoverState: IPopoverContext<HTMLElement>;
  container: RefObject<HTMLLabelElement | null>;
  controller: RefObject<KeyboardNavigableListControls | null>;
  setFocusedID: Dispatch<SetStateAction<string | undefined>>;
}

export interface ComboBoxControls {
  toggle: PopoverToggle;
  setInputValue: Callback<[string]>;
}
