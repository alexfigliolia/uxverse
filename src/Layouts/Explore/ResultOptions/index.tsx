"use client";
import { useCallback, useId, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useClickOutside } from "@figliolia/react-hooks";
import { ListBox, ListBoxControls } from "Components/ListBox";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { ShareIconButton } from "Components/ShareIconButton";
import { useBasicPopoverToggle } from "Hooks/useBasicPopoverToggle";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const ResultOptions = ({ options }: Props) => {
  const listBoxID = useId();
  const { open, toggle } = useBasicPopoverToggle();

  const ref = useClickOutside<HTMLDivElement, false>({
    open,
    refCallback: false,
    callback: () => toggle.close(false),
  });
  const controller = useRef<ListBoxControls>(null);

  const onClick = useCallback(() => {
    if (toggle.isOpen) {
      return toggle.close();
    }
    toggle.open();
  }, [toggle]);

  const renderOption = useCallback(
    ({ Icon, label, url }: ResultOption) => (
      <a target="_blank" href={url}>
        <Icon />
        <ReducedLetterSpacing Tag="span">{label}</ReducedLetterSpacing>
      </a>
    ),
    [],
  );

  const classes = useClassNames("list-container", { open });

  return (
    <div ref={ref} className="explore-result__more">
      <ShareIconButton
        onClick={onClick}
        aria-expanded={open}
        aria-controls={listBoxID}
        aria-label={`Share a link to ${name}`}
      />
      <div className={classes}>
        <div>
          <div className="circle" aria-hidden />
          <ListBox
            Tag="ul"
            selections=""
            items={options}
            aria-hidden={!open}
            onSelection={() => {}}
            controller={controller}
            renderItem={renderOption}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  options: ResultOption[];
}

export interface ResultOption {
  id: number;
  label: string;
  url: string;
  Icon: SVGComponent;
}
