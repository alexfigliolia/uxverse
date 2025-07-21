import {
  HTMLAttributes,
  RefObject,
  use,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { ToolTip } from "Components/ToolTip";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { PopoverContext } from "./Context";

export const Popover = ({
  ref,
  className,
  children,
  retainFocusNodes,
  arrowPosition = "center",
}: Props) => {
  const { toggle, triggerID, visible, popoverID } = use(PopoverContext);
  const node = useRef<HTMLDivElement>(null);
  const nodeCache = useMergedRefs(node, ref);
  const classes = useClassNames("popover", className, arrowPosition, {
    visible,
  });

  const softClose = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        e.target === node.current ||
        node.current?.contains?.(target) ||
        retainFocusNodes?.some?.(
          ref => ref?.current === target || ref?.current?.contains?.(target),
        )
      ) {
        return;
      }
      toggle.close(false);
    },
    [toggle, retainFocusNodes],
  );

  useEffect(() => {
    if (!visible) {
      return document.removeEventListener("click", softClose);
    }
    setTimeout(() => {
      document.addEventListener("click", softClose);
    }, 50);
    return () => {
      document.removeEventListener("click", softClose);
    };
  }, [visible, softClose]);

  return (
    <ToolTip
      role="region"
      id={popoverID}
      ref={nodeCache}
      className={classes}
      aria-hidden={!visible}
      // TODO - test this on a screen reader
      aria-labelledby={triggerID}
      tabIndex={visible ? 0 : -1}>
      {children}
    </ToolTip>
  );
};

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  ref?: RefObject<HTMLDivElement | null>;
  arrowPosition?: "left" | "right" | "center";
  retainFocusNodes?: RefObject<HTMLElement | null>[];
}
