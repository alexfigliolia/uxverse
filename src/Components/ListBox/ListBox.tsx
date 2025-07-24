import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
} from "react";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { useListBoxContext } from "./Context";
import { ListBoxItem, ListBoxItemProps, Props } from "./types";

export function ListBoxComponent<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
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
    (id: string | number) => {
      return (e: MouseEvent<HTMLLIElement>) => {
        const eventTarget = e.target as HTMLElement;
        const target =
          eventTarget.tagName === "LI"
            ? eventTarget
            : eventTarget.closest("li");
        if (!target) {
          return;
        }
        const index = parseInt(target.getAttribute("aria-posinset") ?? "-1");
        if (isNaN(index)) {
          return;
        }
        onItemClick?.(id, e);
        setFocusInside(true);
        triggerRef?.current?.focus?.();
        listController.enterAtIndex(index);
        listController.toggleSelection(id);
      };
    },
    [listController, onItemClick, triggerRef, setFocusInside],
  );

  useEffect(() => {
    const ID = listController.register(({ event, data }) => {
      if (event === "focus") {
        queueTask(() => onItemFocused?.(data.nodeID));
      } else if (event === "selection") {
        queueTask(() => onSelection(data));
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
          <ListItem
            key={item.id}
            aria-posinset={i}
            // TODO handle unknown set sizes
            aria-setsize={items.length}
            ref={listController.cacheRef(i)}
            data-focused={i === focusedIndex}
            onClick={onItemClickInternal(item.id)}
            selected={listController.isSelected(item.id, selections)}>
            {renderItem(item, i, items)}
          </ListItem>
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
      tabIndex={-1}
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

function ListItem({ ref, children, selected, ...rest }: ListBoxItemProps) {
  const ID = useId();
  useImperativeHandle(ref, () => ID, [ID]);

  return (
    <li id={ID} {...rest} role="option" tabIndex={-1} aria-selected={selected}>
      {children}
    </li>
  );
}
