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
  ListBoxOrientation,
  OnListBoxSelectionFN,
  SelectionSet,
} from "Components/ListBox";
import { ToolTip } from "Components/ToolTip";
import { useFocusOutside } from "Hooks/useFocusOutside";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { OptionalChildren } from "Types/React";
import { ComboBoxInput, type Props as InputProps } from "./ComboBoxInput";
import { ComboBoxContext, withComboBoxContext } from "./Context";
import { ComboBoxControls } from "./types";
import "./styles.scss";

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
  multiple,
  onSelect,
  onScroll,
  children,
  className,
  renderItem,
  selections,
  orientation,
  ...rest
}: Props<I, M>) {
  const hasBeenFocused = useRef(false);
  const {
    input,
    container,
    popoverState,
    controller,
    setFocusedID,
    resetListBoxFocusIndex,
  } = use(ComboBoxContext);
  const { visible, popoverID, toggle } = popoverState;

  const closeToggle = useCallback(() => {
    toggle.close(false);
  }, [toggle]);

  const containerNode = useFocusOutside(visible, closeToggle);

  const containerRef = useMergedRefs(container, containerNode);

  useEffect(() => {
    if (items.length && !toggle.isOpen && hasBeenFocused.current) {
      toggle.open();
    } else if (!items.length && toggle.isOpen) {
      closeToggle();
    }
  }, [items, toggle, closeToggle]);

  const onFocusInternal = useCallback(() => {
    hasBeenFocused.current = true;
  }, []);

  const onChangeInternal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      resetListBoxFocusIndex();
    },
    [onChange, resetListBoxFocusIndex],
  );

  const setInputValue = useCallback(
    (value: string) => {
      if (input.current) {
        input.current.value = value;
      }
    },
    [input],
  );

  const controls = useMemo(
    () => ({ toggle, setInputValue }),
    [toggle, setInputValue],
  );

  useImperativeHandle(ref, () => controls, [controls]);

  return (
    <label ref={containerRef} className={className}>
      {children}
      <ComboBoxInput
        {...rest}
        items={items}
        onFocus={onFocusInternal}
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
          triggerRef={input}
          multiple={multiple}
          onSelection={onSelect}
          renderItem={renderItem}
          selections={selections}
          controller={controller}
          orientation={orientation}
          onItemFocused={setFocusedID}
        />
      </ToolTip>
    </label>
  );
}

interface Props<I extends ListBoxItem = ListBoxItem, M extends boolean = false>
  extends Omit<InputProps, "focusedItem" | "ref" | "onFocus">,
    OptionalChildren {
  items: I[];
  multiple: M;
  className?: string;
  selections: SelectionSet<M>;
  orientation?: ListBoxOrientation;
  renderItem: ListBoxChildrenFN<I>;
  onSelect: OnListBoxSelectionFN<M>;
  ref?: RefObject<ComboBoxControls | null>;
  onScroll?: UIEventHandler<HTMLDivElement>;
}
