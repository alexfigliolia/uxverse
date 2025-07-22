import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController } from "@figliolia/react-hooks";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { useReactScheduler } from "Hooks/useReactScheduler";
import { ListBoxController } from "./ListBoxController";
import {
  ListBoxFocusEvent,
  ListBoxItem,
  ListBoxItemProps,
  ListElement,
  Props,
} from "./types";

export const ListBox = <
  T extends "ul" | "ol",
  I extends ListBoxItem = ListBoxItem,
  M extends boolean = false,
>({
  ref,
  Tag,
  items,
  multiple,
  renderItem,
  selections,
  controller,
  onItemClick,
  onSelection,
  onItemFocused,
  orientation = "vertical",
  ...rest
}: Props<T, I, M>) => {
  const queueTask = useReactScheduler();
  const [focusInside, setFocusInside] = useState(false);
  const listController = useController(
    new ListBoxController(selections, multiple, orientation),
  );
  const listbox = useRef<ListElement<T>>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  listController.setScope(items, selections, orientation);

  const enter = useCallback(() => {
    listController.enterListBox();
    setFocusInside(true);
  }, [listController]);

  const exit = useCallback(() => {
    listController.destroy();
    setFocusInside(false);
  }, [listController]);

  useImperativeHandle(
    controller,
    () => ({
      exit,
      enter,
      resetFocus: listController.resetFocusIndex,
      getMappedKeys: listController.getMappedKeys,
    }),
    [enter, exit, listController],
  );

  const onFocus = useCallback(
    (data: ListBoxFocusEvent["data"]) => {
      setFocusedIndex(data.index);
      onItemFocused?.(data.nodeID);
      if (listbox.current && data.nodeID && data.scrollTo) {
        listbox.current.querySelector(`#${data.nodeID}`)!.scrollIntoView();
      }
    },
    [onItemFocused],
  );

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
        listController.enterAtIndex(index);
        listController.toggleSelection(id);
      };
    },
    [listController, onItemClick],
  );

  useEffect(() => {
    const ID = listController.register(({ event, data }) => {
      if (event === "focus") {
        queueTask(() => onFocus(data));
      } else if (event === "selection") {
        queueTask(() => onSelection(data));
      }
    });
    return () => {
      listController.remove(ID);
    };
  }, [listController, onFocus, onSelection, queueTask]);

  const mergedRefs = useMergedRefs(listbox, ref);

  const children = useMemo(
    () =>
      items.map((item, i) => {
        return (
          <ListItem
            key={item.id}
            aria-posinset={i}
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
      {...rest}>
      {children}
    </Tag>
  );
};

function ListItem({ ref, children, selected, ...rest }: ListBoxItemProps) {
  const ID = useId();
  useImperativeHandle(ref, () => ID, [ID]);

  return (
    <li id={ID} {...rest} role="option" tabIndex={-1} aria-selected={selected}>
      {children}
    </li>
  );
}
