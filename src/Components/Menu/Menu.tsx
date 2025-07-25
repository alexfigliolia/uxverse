import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
} from "react";
import { ListBoxItem, ListBoxItemProps } from "Components/ListBox";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { useMenuContext } from "./Context";
import { Props } from "./types";

export function MenuComponent<
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
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
        menuController.enterAtIndex(index);
      };
    },
    [menuController, onItemClick, triggerRef, setFocusInside],
  );

  useEffect(() => {
    const ID = menuController.register(({ data }) => {
      queueTask(() => onItemFocused?.(data.nodeID));
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
          <ListItem
            key={item.id}
            aria-posinset={i}
            // TODO handle unknown set sizes
            aria-setsize={items.length}
            ref={menuController.cacheRef(i)}
            data-focused={i === focusedIndex}
            onClick={onItemClickInternal(item.id)}>
            {renderItem(item, i, items)}
          </ListItem>
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

function ListItem({
  ref,
  children,
  ...rest
}: Omit<ListBoxItemProps, "selected">) {
  const ID = useId();
  useImperativeHandle(ref, () => ID, [ID]);
  return (
    <li id={ID} {...rest} role="menuitem" tabIndex={-1}>
      {children}
    </li>
  );
}
