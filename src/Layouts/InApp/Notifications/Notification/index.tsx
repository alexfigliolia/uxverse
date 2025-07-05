"use client";
import {
  Fragment,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { CloserButton } from "Components/CloserButton";
import { NotificationsContext } from "../Context";
import { INotification } from "../NotificationStack";
import { Controller } from "./Controller";
import "./styles.scss";

export const Notification = ({ ID, title, message, type, deleting }: Props) => {
  const timeout = useTimeout();
  const { stack } = use(NotificationsContext);
  const node = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState<number>();

  const onClose = useCallback(() => {
    setVisible(false);
    timeout.execute(() => {
      stack.delete(ID);
    }, 800);
  }, [ID, stack, timeout]);

  useEffect(() => {
    if (deleting) {
      onClose();
    }
  }, [deleting, onClose]);

  useEffect(() => {
    timeout.execute(() => setVisible(true), 10);
  }, [timeout]);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    setScrollHeight(node.current.scrollHeight);
  }, [title, message, type]);

  const userFacingTitle = useMemo(
    () => title ?? Controller.defaultTitle(type),
    [title, type],
  );

  const Icon = useMemo(() => Controller.getIcon(type), [type]);
  const themeColor = useMemo(() => Controller.themeColor(type), [type]);
  const themeGradient = useMemo(() => Controller.themeGradient(type), [type]);
  const typeClassName = useMemo(() => type.toLowerCase(), [type]);
  const classes = useClassNames("notification", typeClassName, { visible });

  return (
    <div
      ref={node}
      className={classes}
      style={{
        "--max-height": `${scrollHeight ?? 0}px`,
        "--theme-color": themeColor,
        "--theme-gradient": themeGradient,
      }}>
      <div>
        <CloserButton onClick={onClose} />
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
              <div className="notification-content__title">
                {userFacingTitle}
              </div>
              <div className="notification-content__message">{message}</div>
            </Fragment>
          ) : (
            <Fragment>
              {title}
              {message}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

interface Props extends INotification {
  ID: string;
}
