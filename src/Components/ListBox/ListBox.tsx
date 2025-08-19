import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
} from "react";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { ListItem } from "Tools/KeyboardNavigableList";
import { useListBoxContext } from "./Context";
import { ListBoxItemProps, Props } from "./types";

export function ListBoxComponent<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  M extends boolean = false,
  E extends HTMLElement = HTMLElement,
>({
  ref,
  Tag,
  items,
  multiple,
  triggerRef,
  renderItem,
  selections,
  onItemClick,
  onSelection,
  onItemFocused,
  controller: _,
  orientation = "vertical",
  ...rest
}: Props<T, I, M, E>) {
  const {
    listbox,
    focusedID,
    queueTask,
    focusInside,
    focusedIndex,
    setFocusInside,
    listController,
  } = useListBoxContext<T, I, M>();

  const onItemClickInternal = useCallback(
    (id: string | number, e: MouseEvent<HTMLLIElement>) => {
      const eventTarget = e.target as HTMLElement;
      const target =
        eventTarget.tagName === "LI" ? eventTarget : eventTarget.closest("li");
      if (!target) {
        return;
      }
      const index = parseInt(target.getAttribute("aria-posinset") ?? "0") - 1;
      if (isNaN(index)) {
        return;
      }
      onItemClick?.(id, e);
      setFocusInside(true);
      triggerRef?.current?.focus?.();
      listController.enterAtIndex(index);
      listController.toggleSelection(id, "mouse");
    },
    [listController, onItemClick, triggerRef, setFocusInside],
  );

  useEffect(() => {
    const ID = listController.register(({ event, data }) => {
      if (event === "focus") {
        queueTask(() => onItemFocused?.(data.nodeID, data.index));
      } else if (event === "selection") {
        queueTask(() => onSelection(data.selections, data.origin));
      }
    });
    return () => {
      listController.remove(ID);
    };
  }, [listController, onItemFocused, onSelection, queueTask]);

  const mergedRefs = useMergedRefs(listbox, ref);

  const children = useMemo(
    () =>
      items.map((item, i) => {
        return (
          <ListBoxItem
            key={item.id}
            aria-posinset={i + 1}
            listItemID={item.id}
            // TODO handle unknown set sizes
            aria-setsize={items.length}
            onClick={onItemClickInternal}
            ref={listController.cacheRef(i)}
            data-focused={i === focusedIndex}
            selected={listController.isSelected(item.id, selections)}>
            {renderItem(item, i, items)}
          </ListBoxItem>
        );
      }),
    [
      items,
      renderItem,
      selections,
      focusedIndex,
      listController,
      onItemClickInternal,
    ],
  );

  return (
    // @ts-ignore
    <Tag
      role="listbox"
      ref={mergedRefs}
      data-focused={focusInside}
      aria-orientation={orientation}
      aria-multiselectable={multiple}
      aria-activedescendant={focusedID}
      {...rest}>
      {children}
    </Tag>
  );
}

function ListBoxItem({
  ref,
  children,
  selected,
  onClick,
  listItemID,
  ...rest
}: ListBoxItemProps) {
  const ID = useId();
  useImperativeHandle(ref, () => ID, [ID]);

  const onItemClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      onClick(listItemID, e);
    },
    [listItemID, onClick],
  );

  return (
    <li
      id={ID}
      onClick={onItemClick}
      role="option"
      aria-selected={selected}
      {...rest}>
      {children}
    </li>
  );
}
