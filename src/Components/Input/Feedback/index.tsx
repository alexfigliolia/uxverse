"use client";
import { Fragment, RefObject, use, useImperativeHandle, useMemo } from "react";
import { PopoverToggle } from "@figliolia/modal-stack";
import { IPopoverContext, Popover, PopoverContext } from "Components/Popover";
import { CheckCircleStroked } from "Icons/CheckCircle";
import { WarningStroked } from "Icons/Warning";
import "./styles.scss";

export const FeedBack = ({ ref, text, container, valid }: Props) => {
  const { visible, triggerID, popoverID, triggerRef, togglePopover, toggle } =
    use(PopoverContext) as IPopoverContext<HTMLButtonElement>;

  useImperativeHandle(ref, () => toggle, [toggle]);

  const ariaLabel = useMemo(() => {
    if (valid === "INVALID") {
      return "See how to fix your entry";
    }
    return "You entry is currently valid";
  }, [valid]);

  const popoverVisibilityRetainers = useMemo(() => [container], [container]);

  return (
    <Fragment>
      <button
        type="button"
        id={triggerID}
        ref={triggerRef}
        aria-label={ariaLabel}
        onClick={togglePopover}
        aria-expanded={visible}
        aria-controls={popoverID}
        aria-hidden={valid !== "INVALID"}
        className="uxverse-input__feedback"
        tabIndex={valid === "INVALID" ? 0 : -1}>
        <CheckCircleStroked aria-hidden />
        <WarningStroked aria-hidden />
      </button>
      <Popover
        arrowPosition="right"
        className="uxverse-input__popover"
        aria-live={visible ? "polite" : "off"}
        retainFocusNodes={popoverVisibilityRetainers}>
        {text}
      </Popover>
    </Fragment>
  );
};

interface Props {
  text: string;
  valid: InputValidity;
  ref?: RefObject<PopoverToggle | null>;
  container: RefObject<HTMLDivElement | null>;
}

export type InputValidity = "UNKNOWN" | "VALID" | "INVALID";
