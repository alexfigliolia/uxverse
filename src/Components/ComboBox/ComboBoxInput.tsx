import {
  ChangeEvent,
  HTMLProps,
  KeyboardEvent,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ListBoxItem } from "Components/ListBox";
import { ComboBoxContext } from "./Context";

export const ComboBoxInput = <I extends ListBoxItem = ListBoxItem>({
  ref,
  type,
  name,
  items,
  onChange,
  placeholder,
  readonlyInput = false,
  autoComplete = "list",
}: Props<I>) => {
  const [inListBox, setInListBox] = useState(false);
  const { popoverState, focusedItem, controller, containerRef } =
    use(ComboBoxContext);
  const { visible, popoverID, toggle } = popoverState;

  useEffect(() => {
    if (!visible) {
      setInListBox(false);
      controller.current?.exit?.();
    }
  }, [visible, controller]);

  const onFocus = useCallback(() => {
    if (!toggle.isOpen && items.length) {
      toggle.open();
    }
  }, [toggle, items]);

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
        setInListBox(true);
        controller.current?.enter?.();
        if (!toggle.isOpen) {
          toggle.open();
        }
      }
    },
    [toggle, controller],
  );

  const onKeyDownInside = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (controller?.current?.getMappedKeys?.()?.has?.(e.key)) {
        e.preventDefault();
      }
    },
    [controller],
  );

  const onKeyDown = useMemo(
    () => (inListBox ? onKeyDownInside : onKeyDownOutside),
    [inListBox, onKeyDownInside, onKeyDownOutside],
  );

  const onFocusIn = useCallback(
    (e: FocusEvent) => {
      if (
        toggle.isOpen &&
        !containerRef.current?.contains?.(e.target as HTMLElement)
      ) {
        toggle.close(false);
      }
    },
    [toggle, containerRef],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener("focusin", onFocusIn);
    } else {
      document.removeEventListener("focusin", onFocusIn);
    }
    return () => {
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [visible, onFocusIn]);

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      role="combobox"
      onChange={search}
      onFocus={onFocus}
      autoComplete="off"
      onKeyDown={onKeyDown}
      aria-expanded={visible}
      readOnly={readonlyInput}
      aria-controls={popoverID}
      placeholder={placeholder}
      aria-autocomplete={autoComplete}
      aria-activedescendant={visible ? focusedItem : undefined}
    />
  );
};

export interface Props<I extends ListBoxItem = ListBoxItem>
  extends Pick<
    HTMLProps<HTMLInputElement>,
    "type" | "name" | "placeholder" | "ref" | "onChange"
  > {
  items: I[];
  readonlyInput?: boolean;
  autoComplete?: "none" | "inline" | "list" | "both";
}
