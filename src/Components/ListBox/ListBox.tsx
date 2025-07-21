import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
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
  children,
  multiple,
  selections,
  controller,
  onItemClick,
  onSelection,
  onItemFocused,
  ...rest
}: Props<T, I, M>) => {
  const queueTask = useReactScheduler();
  const listController = useController(
    new ListBoxController(selections, multiple),
  );
  const listbox = useRef<ListElement<T>>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  listController.setScope(items, selections);

  useImperativeHandle(
    controller,
    () => ({
      exit: listController.destroy,
      enter: listController.enterListBox,
      resetFocus: listController.resetFocusIndex,
    }),
    [listController],
  );

  const onFocus = useCallback(
    (data: ListBoxFocusEvent["data"]) => {
      setFocusedIndex(data.index);
      onItemFocused?.(data.nodeID);
      if (listbox.current && data.nodeID) {
        listbox.current.querySelector(`#${data.nodeID}`)!.scrollIntoView();
      }
    },
    [onItemFocused],
  );

  const onItemClickInternal = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      const eventTarget = e.target as HTMLElement;
      const target =
        eventTarget.tagName === "LI" ? eventTarget : eventTarget.closest("li");
      if (!target) {
        return;
      }
      const index = parseInt(target.getAttribute("aria-posinset") ?? "-1");
      setFocusedIndex(index);
      onItemFocused?.(target.id);
      listController.focusIndex = index;
      onItemClick?.(e);
    },
    [onItemFocused, listController, onItemClick],
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

  return (
    // @ts-ignore
    <Tag
      tabIndex={-1}
      role="listbox"
      ref={mergedRefs}
      aria-multiselectable={multiple}
      {...rest}>
      {items.map((item, i) => {
        return (
          <ListItem
            key={item.id}
            aria-posinset={i}
            onClick={onItemClickInternal}
            ref={listController.cacheRef(i)}
            data-focused={i === focusedIndex}
            selected={listController.isSelected(item.id)}>
            {children(item, i, items)}
          </ListItem>
        );
      })}
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
