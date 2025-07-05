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

  const Icon = useMemo(() => Controller.getIcon(type), [type]);
  const themeColor = useMemo(() => Controller.themeColor(type), [type]);
  const themeGradient = useMemo(() => Controller.themeGradient(type), [type]);
  const typeClassName = useMemo(() => type.toLowerCase(), [type]);
  const classes = useClassNames("notification", typeClassName, { visible });

  return (
    <div
      ref={node}
      role="alertdialog"
      className={classes}
      aria-labelledby={labelID}
      aria-describedby={descriptionID}
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
