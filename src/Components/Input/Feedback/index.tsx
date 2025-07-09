"use client";
import { Fragment, RefObject, use, useImperativeHandle } from "react";
import { PopoverToggle } from "@figliolia/modal-stack";
import { Popover, PopoverContext } from "Components/Popover";
import { CheckCircleStroked } from "Icons/CheckCircle";
import { WarningStroked } from "Icons/Warning";
import "./styles.scss";

export const FeedBack = ({ ref, text, valid }: Props) => {
  const { visible, triggerID, popoverID, targetRef, togglePopover, toggle } =
    use(PopoverContext);

  useImperativeHandle(ref, () => toggle, [toggle]);

  return (
    <Fragment>
      <button
        type="button"
        id={triggerID}
        ref={targetRef}
        onClick={togglePopover}
        aria-expanded={visible}
        aria-controls={popoverID}
        aria-hidden={valid !== "INVALID"}
        className="visitor-input__feedback"
        tabIndex={valid === "INVALID" ? 0 : -1}>
        <CheckCircleStroked aria-hidden />
        <WarningStroked aria-hidden />
      </button>
      <Popover
        arrowPosition="right"
        className="visitor-input__popover"
        aria-live={visible ? "polite" : "off"}>
        {text}
      </Popover>
    </Fragment>
  );
};

interface Props {
  text: string;
  valid: InputValidity;
  ref?: RefObject<PopoverToggle | null>;
}

export type InputValidity = "UNKNOWN" | "VALID" | "INVALID";
