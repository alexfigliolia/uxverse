"use client";
import {
  Fragment,
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { usePopoverToggle } from "@figliolia/modal-stack";
import { useTimeout } from "@figliolia/react-hooks";
import { CloserButton } from "Components/CloserButton";
import { NotificationsContext } from "../Context";
import { INotification } from "../NotificationStack";
import { Controller } from "./Controller";
import "./styles.scss";

export const Notification = ({ ID, title, message, type, deleting }: Props) => {
  const labelID = useId();
  const descriptionID = useId();
  const timeout = useTimeout();
  const { stack } = use(NotificationsContext);
  const node = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState<number>();

  const close = useCallback(() => {
    setVisible(false);
    timeout.execute(() => {
      stack.delete(ID);
    }, 800);
  }, [ID, stack, timeout]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const toggle = usePopoverToggle(open, close);

  useEffect(() => {
    if (deleting) {
      toggle.close();
    }
  }, [deleting, toggle]);

  useEffect(() => {
    timeout.execute(() => toggle.open(), 10);
  }, [timeout, toggle]);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    setScrollHeight(node.current.scrollHeight);
  }, [title, message, type]);

  const closeNotification = useCallback(() => {
    toggle.close();
  }, [toggle]);

  const Icon = useMemo(() => Controller.getIcon(type), [type]);
  const themeColor = useMemo(() => Controller.themeColor(type), [type]);
  const themeGradient = useMemo(() => Controller.themeGradient(type), [type]);
  const typeClassName = useMemo(() => type.toLowerCase(), [type]);
  const classes = useClassNames("notification", typeClassName, { visible });

  // TODO - test announcement on screen reader
  return (
    <div
      ref={node}
      role="alert"
      className={classes}
      aria-labelledby={labelID}
      aria-describedby={descriptionID}
      style={{
        "--max-height": `${scrollHeight ?? 0}px`,
        "--theme-color": themeColor,
        "--theme-gradient": themeGradient,
      }}>
      <div>
        <CloserButton onClick={closeNotification} />
        {type !== "CUSTOM" && (
          <Fragment>
            <div className="notification-icon">
              <Icon aria-hidden />
            </div>
            <div className="notification-background-icon">
              <Icon aria-hidden />
            </div>
          </Fragment>
        )}
        <div className="notification-content">
          {type !== "CUSTOM" ? (
            <Fragment>
              <div id={labelID} className="notification-content__title">
                {title ?? Controller.defaultTitle(type)}
              </div>
              <div id={descriptionID} className="notification-content__message">
                {message}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {title?.(labelID)}
              {message(descriptionID)}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {
  ID: string;
} & INotification;
