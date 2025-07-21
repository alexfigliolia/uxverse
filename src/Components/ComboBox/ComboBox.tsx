import {
  ChangeEvent,
  RefObject,
  UIEventHandler,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  ListBox,
  ListBoxChildrenFN,
  ListBoxItem,
  OnListBoxSelectionFN,
  SelectionSet,
} from "Components/ListBox";
import { ToolTip } from "Components/ToolTip";
import { ComboBoxInput, type Props as InputProps } from "./ComboBoxInput";
import { ComboBoxContext, withComboBoxContext } from "./Context";
import { ComboBoxControls } from "./types";
import "./styles.scss";
/* eslint-disable react/no-children-prop */

export const ComboBox = withComboBoxContext(
  ComboBoxImpl,
) as typeof ComboBoxImpl;

function ComboBoxImpl<
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
>({
  ref,
  items,
  onChange,
  children,
  multiple,
  onSelect,
  onScroll,
  className,
  selections,
  ...rest
}: Props<I, M>) {
  const input = useRef<HTMLInputElement>(null);
  const { popoverState, setFocusedItem, containerRef, controller } =
    use(ComboBoxContext);
  const { visible, popoverID, toggle } = popoverState;

  useEffect(() => {
    if (items.length && !toggle.isOpen) {
      toggle.open();
    } else if (!items.length && toggle.isOpen) {
      toggle.close(false);
    }
  }, [items, toggle]);

  const onChangeInternal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      controller.current?.resetFocus?.();
    },
    [onChange, controller],
  );

  const onItemClick = useCallback(() => {
    input.current?.focus?.();
  }, []);

  const focusInput = useCallback(() => {
    input.current?.focus();
  }, []);

  const setInputValue = useCallback((value: string) => {
    if (input.current) {
      input.current.value = value;
    }
  }, []);

  const controls = useMemo(
    () => ({ toggle, setInputValue, focusInput }),
    [toggle, setInputValue, focusInput],
  );

  useImperativeHandle(ref, () => controls, [controls]);

  return (
    <label className={className} ref={containerRef}>
      <ComboBoxInput
        {...rest}
        ref={input}
        items={items}
        onChange={onChangeInternal}
      />
      <ToolTip
        className="combo-box-list"
        arrowPosition="left"
        aria-hidden={!visible}
        onScroll={onScroll}>
        <ListBox
          Tag="ol"
          items={items}
          id={popoverID}
          multiple={multiple}
          children={children}
          onSelection={onSelect}
          selections={selections}
          controller={controller}
          onItemClick={onItemClick}
          onItemFocused={setFocusedItem}
        />
      </ToolTip>
    </label>
  );
}

interface Props<I extends ListBoxItem = ListBoxItem, M extends boolean = false>
  extends Omit<InputProps, "focusedItem" | "ref"> {
  items: I[];
  multiple: M;
  className?: string;
  selections: SelectionSet<M>;
  children: ListBoxChildrenFN<I>;
  onSelect: OnListBoxSelectionFN<M>;
  ref?: RefObject<ComboBoxControls | null>;
  onScroll?: UIEventHandler<HTMLDivElement>;
}
