import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
} from "react";
import { ListBoxItemProps } from "Components/ListBox";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { ListItem } from "Tools/KeyboardNavigableList";
import { useMenuContext } from "./Context";
import { Props } from "./types";

export function MenuComponent<
  T extends "ul" | "ol",
  I extends ListItem = ListItem,
  E extends HTMLElement = HTMLElement,
>({
  ref,
  Tag,
  items,
  triggerRef,
  renderItem,
  onItemClick,
  onItemFocused,
  controllerRef: _,
  orientation = "vertical",
  ...rest
}: Props<T, I, E>) {
  const {
    focusedID,
    queueTask,
    controller,
    listElement,
    focusInside,
    focusedIndex,
    setFocusInside,
  } = useMenuContext<I>();

  const onItemClickInternal = useCallback(
    (id: string | number, e: MouseEvent<HTMLLIElement>) => {
      const eventTarget = e.target as HTMLElement;
      const target =
        eventTarget.tagName === "LI" ? eventTarget : eventTarget.closest("li");
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
      controller.enterAtIndex(index);
    },
    [controller, onItemClick, triggerRef, setFocusInside],
  );

  useEffect(() => {
    const ID = controller.register(({ data }) => {
      queueTask(() => onItemFocused?.(data.nodeID, data.index));
    });
    return () => {
      controller.remove(ID);
    };
  }, [controller, onItemFocused, queueTask]);

  const mergedRefs = useMergedRefs(listElement, ref);

  const children = useMemo(
    () =>
      items.map((item, i) => {
        return (
          <MenuItem
            key={item.id}
            aria-posinset={i + 1}
            listItemID={item.id}
            // TODO handle unknown set sizes
            aria-setsize={items.length}
            onClick={onItemClickInternal}
            ref={controller.cacheRef(i)}
            data-focused={i === focusedIndex}>
            {renderItem(item, i, items)}
          </MenuItem>
        );
      }),
    [items, renderItem, focusedIndex, controller, onItemClickInternal],
  );

  return (
    // @ts-ignore
    <Tag
      role="menu"
      tabIndex={-1}
      ref={mergedRefs}
      data-focused={focusInside}
      aria-orientation={orientation}
      aria-activedescendant={focusedID}
      {...rest}>
      {children}
    </Tag>
  );
}

function MenuItem({
  ref,
  children,
  listItemID,
  onClick,
  ...rest
}: Omit<ListBoxItemProps, "selected">) {
  const ID = useId();
  useImperativeHandle(ref, () => ID, [ID]);

  const onClickItem = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      onClick(listItemID, e);
    },
    [listItemID, onClick],
  );

  return (
    <li id={ID} onClick={onClickItem} role="menuitem" tabIndex={-1} {...rest}>
      {children}
    </li>
  );
}
