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
  orientation = "vertical",
  ...rest
}: Props<T, I, E>) {
  const {
    menu,
    focusedID,
    queueTask,
    focusInside,
    focusedIndex,
    setFocusInside,
    menuController,
  } = useMenuContext<T, I>();

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
      menuController.enterAtIndex(index);
    },
    [menuController, onItemClick, triggerRef, setFocusInside],
  );

  useEffect(() => {
    const ID = menuController.register(({ data }) => {
      queueTask(() => onItemFocused?.(data.nodeID, data.index));
    });
    return () => {
      menuController.remove(ID);
    };
  }, [menuController, onItemFocused, queueTask]);

  const mergedRefs = useMergedRefs(menu, ref);

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
            ref={menuController.cacheRef(i)}
            data-focused={i === focusedIndex}>
            {renderItem(item, i, items)}
          </MenuItem>
        );
      }),
    [items, renderItem, focusedIndex, menuController, onItemClickInternal],
  );

  return (
    // @ts-ignore
    <Tag
      tabIndex={-1}
      role="menu"
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
