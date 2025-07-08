import {
  HTMLAttributes,
  RefObject,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useSizeObserver } from "@figliolia/size-observer";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { PopoverContext } from "./Context";
import "./styles.scss";

export const Popover = ({
  id,
  ref,
  target,
  className,
  visible,
  children,
}: Props) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const { toggle } = use(PopoverContext);
  const node = useRef<HTMLDivElement>(null);
  const classes = useClassNames("popover", className, { visible });

  const computePosition = useCallback(() => {
    if (!target.current || !node.current) {
      return;
    }
    const { width, height, top } = target.current.getBoundingClientRect();
    const { width: popoverWidth, height: popoverHeight } =
      node.current.getBoundingClientRect();
    const popoverWidthHalf = popoverWidth / 2;
    const popoverHeightHalf = popoverHeight / 2;
    let X = width / 2 - popoverWidthHalf;
    let Y = -popoverHeight;
    if (X + popoverHeightHalf > window.innerWidth) {
      X = -popoverWidth;
    }
    if (top - Y < 0) {
      Y = height;
    }
    setTop(Y);
    setLeft(X);
  }, [node, target]);

  const softClose = useCallback(() => {
    toggle.close(false);
  }, [toggle]);

  useEffect(() => {
    if (!visible) {
      return document.removeEventListener("click", softClose);
    }
    computePosition();
    setTimeout(() => {
      document.addEventListener("click", softClose);
    }, 50);
    return () => {
      document.removeEventListener("click", softClose);
    };
  }, [visible, computePosition, softClose]);

  const observedNode = useSizeObserver({
    width: true,
    height: true,
    onChange: computePosition,
  });

  const nodeCache = useMergedRefs(node, observedNode, ref);

  return (
    <div
      id={id}
      ref={nodeCache}
      className={classes}
      style={{ top, left }}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}>
      <div>{children}</div>
    </div>
  );
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  ref?: RefObject<HTMLDivElement | null>;
  target: RefObject<HTMLButtonElement | null>;
}
