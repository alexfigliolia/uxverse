import {
  HTMLAttributes,
  RefObject,
  use,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { TriangleIcon } from "Icons/Triangle";
import { PopoverContext } from "./Context";
import "./styles.scss";

export const Popover = ({
  ref,
  className,
  children,
  arrowPosition = "center",
}: Props) => {
  const { toggle, triggerID, visible, popoverID } = use(PopoverContext);
  const node = useRef<HTMLDivElement>(null);
  const nodeCache = useMergedRefs(node, ref);
  const classes = useClassNames("popover", className, arrowPosition, {
    visible,
  });

  const softClose = useCallback(() => {
    toggle.close(false);
  }, [toggle]);

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
    <div
      role="region"
      id={popoverID}
      ref={nodeCache}
      className={classes}
      aria-hidden={!visible}
      aria-labelledby={triggerID}
      tabIndex={visible ? 0 : -1}>
      <div>
        <div>{children}</div>
        <TriangleIcon aria-hidden />
      </div>
    </div>
  );
};

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  ref?: RefObject<HTMLDivElement | null>;
  arrowPosition?: "left" | "right" | "center";
}
