import {
  ChangeEvent,
  FocusEvent as ReactFocusEvent,
  HTMLProps,
  KeyboardEvent,
  use,
  useCallback,
  useMemo,
} from "react";
import { ListBoxItem } from "Components/ListBox";
import { ComboBoxContext } from "./Context";

export const ComboBoxInput = <I extends ListBoxItem = ListBoxItem>({
  type,
  name,
  items,
  onFocus,
  onChange,
  placeholder,
  readonlyInput = false,
  autoComplete = "list",
}: Props<I>) => {
  const { input, enterListBox, popoverState, listBoxFocused, focusedID } =
    use(ComboBoxContext);
  const { visible, popoverID, toggle } = popoverState;

  const onFocusInternal = useCallback(
    (e: ReactFocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      if (!toggle.isOpen && items.length) {
        toggle.open();
      }
    },
    [toggle, items, onFocus],
  );

  const search = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (toggle.isOpen && !e.target.value) {
        toggle.close(false);
      }
    },
    [onChange, toggle],
  );

  const onKeyDownOutside = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        enterListBox();
        if (!toggle.isOpen) {
          toggle.open();
        }
      }
    },
    [toggle, enterListBox],
  );

  const onKeyDown = useMemo(
    () => (listBoxFocused ? undefined : onKeyDownOutside),
    [listBoxFocused, onKeyDownOutside],
  );

  const onClick = useCallback(() => {
    if (!visible && items.length) {
      toggle.open();
    }
  }, [visible, toggle, items.length]);

  return (
    <input
      ref={input}
      type={type}
      name={name}
      role="combobox"
      onChange={search}
      onClick={onClick}
      autoComplete="off"
      onKeyDown={onKeyDown}
      aria-expanded={visible}
      readOnly={readonlyInput}
      aria-controls={popoverID}
      placeholder={placeholder}
      onFocus={onFocusInternal}
      aria-autocomplete={autoComplete}
      aria-activedescendant={focusedID}
    />
  );
};

export interface Props<I extends ListBoxItem = ListBoxItem>
  extends Pick<
    HTMLProps<HTMLInputElement>,
    "type" | "name" | "placeholder" | "onChange" | "onFocus"
  > {
  items: I[];
  readonlyInput?: boolean;
  autoComplete?: "none" | "inline" | "list" | "both";
}
