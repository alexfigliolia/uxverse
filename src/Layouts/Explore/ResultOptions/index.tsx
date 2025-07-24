"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useClickOutside } from "@figliolia/react-hooks";
import { ListBox, ListBoxControls } from "Components/ListBox";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { useBasicPopoverToggle } from "Hooks/useBasicPopoverToggle";
import { useFocusOutside } from "Hooks/useFocusOutside";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { MoreStroked } from "Icons/More";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const ResultOptions = ({ options, name }: Props) => {
  const listBoxID = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const { open, toggle } = useBasicPopoverToggle();
  const [selected, setSelected] = useState<number | string>();

  const onClick = useCallback(() => {
    if (toggle.isOpen) {
      return toggle.close();
    }
    toggle.open();
  }, [toggle]);

  const closeToggle = useCallback(() => {
    toggle.close(false);
  }, [toggle]);

  const ref = useClickOutside<HTMLDivElement, false>({
    open,
    refCallback: false,
    callback: closeToggle,
  });
  const controller = useRef<ListBoxControls>(null);

  const detectListBoxEntrance = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      controller.current?.enter?.();
      document.removeEventListener("keydown", detectListBoxEntrance);
    }
  }, []);

  const container = useFocusOutside(open, closeToggle);

  const mergedRefs = useMergedRefs(container, ref);

  useEffect(() => {
    if (!open) {
      controller.current?.exit?.();
      document.removeEventListener("keydown", detectListBoxEntrance);
    }
  }, [open, controller, detectListBoxEntrance]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", detectListBoxEntrance);
    } else {
      document.removeEventListener("keydown", detectListBoxEntrance);
    }
    return () => {
      document.removeEventListener("keydown", detectListBoxEntrance);
    };
  }, [open, detectListBoxEntrance]);

  const renderOption = useCallback(
    ({ Icon, label, url }: ResultOption) => (
      <a target="_blank" href={url} tabIndex={-1}>
        <Icon />
        <ReducedLetterSpacing Tag="span">{label}</ReducedLetterSpacing>
      </a>
    ),
    [],
  );

  return (
    <div ref={mergedRefs} className="explore-result__more">
      <button
        ref={trigger}
        onClick={onClick}
        aria-expanded={open}
        aria-controls={listBoxID}
        aria-label={`View associated links and options for ${name}`}>
        <MoreStroked aria-hidden />
      </button>
      <div id={listBoxID} className="list-container" aria-hidden={!open}>
        <div>
          <div className="circle" aria-hidden />
          <ListBox
            Tag="ul"
            items={options}
            triggerRef={trigger}
            selections={selected}
            controller={controller}
            renderItem={renderOption}
            onSelection={setSelected}
            aria-label={`Associated links and options for ${name}`}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  name: string;
  options: ResultOption[];
}

export interface ResultOption {
  id: number;
  label: string;
  url: string;
  Icon: SVGComponent;
}
