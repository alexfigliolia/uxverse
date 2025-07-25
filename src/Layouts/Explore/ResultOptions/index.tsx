"use client";
import { useCallback, useEffect, useRef } from "react";
import { useClickOutside } from "@figliolia/react-hooks";
import { ListBoxControls } from "Components/ListBox";
import { Menu } from "Components/Menu";
import { useButtonPopover, withPopoverContext } from "Components/Popover";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { useFocusOutside } from "Hooks/useFocusOutside";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { MoreCircle } from "Icons/MoreCircle";
import { Callback } from "Types/Generics";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const ResultOptions = withPopoverContext(({ options, name }: Props) => {
  const { visible, toggle, triggerRef, triggerID, popoverID } =
    useButtonPopover();

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
    open: visible,
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

  const container = useFocusOutside(visible, closeToggle);

  const mergedRefs = useMergedRefs(container, ref);

  useEffect(() => {
    if (!visible) {
      controller.current?.exit?.();
      document.removeEventListener("keydown", detectListBoxEntrance);
    }
  }, [visible, controller, detectListBoxEntrance]);

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", detectListBoxEntrance);
    } else {
      document.removeEventListener("keydown", detectListBoxEntrance);
    }
    return () => {
      document.removeEventListener("keydown", detectListBoxEntrance);
    };
  }, [visible, detectListBoxEntrance]);

  const renderOption = useCallback(
    ({ Icon, label, url, onClick }: ResultOption) => {
      if (url) {
        return (
          <a target="_blank" href={url} tabIndex={-1}>
            <Icon />
            <ReducedLetterSpacing Tag="span">{label}</ReducedLetterSpacing>
          </a>
        );
      }
      return (
        <button onClick={onClick} tabIndex={-1}>
          <Icon />
          <ReducedLetterSpacing Tag="span">{label}</ReducedLetterSpacing>
        </button>
      );
    },
    [],
  );

  return (
    <div ref={mergedRefs} className="explore-result__more">
      <button
        id={triggerID}
        ref={triggerRef}
        onClick={onClick}
        aria-expanded={visible}
        aria-controls={popoverID}
        aria-label={`View associated links and options for ${name}`}>
        <MoreCircle aria-hidden />
      </button>
      <div id={popoverID} className="list-container" aria-hidden={!visible}>
        <div>
          <div className="circle" aria-hidden />
          <Menu
            Tag="ul"
            items={options}
            triggerRef={triggerRef}
            controller={controller}
            renderItem={renderOption}
            aria-labelledby={triggerID}
          />
        </div>
      </div>
    </div>
  );
});

interface Props {
  name: string;
  options: ResultOption[];
}

export interface BaseOption {
  id: number;
  label: string;
  Icon: SVGComponent;
}

export type ResultOption = BaseOption &
  (
    | {
        url: string;
        onClick: never;
      }
    | { onClick: Callback; url: never }
  );
