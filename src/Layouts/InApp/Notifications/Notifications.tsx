"use client";
import { use } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Portal } from "Components/Portal";
import { Propless } from "Types/React";
import { NotificationsContext } from "./Context";
import { Notification } from "./Notification";
import "./styles.scss";

export const Notifications = (_: Propless) => {
  const { notifications } = use(NotificationsContext);
  const classes = useClassNames("notifications-stack", {
    empty: notifications.size === 0,
  });
  return (
    <Portal>
      <div className={classes}>
        {notifications.map((entry, id) => {
          return <Notification key={id} ID={id} {...entry} />;
        })}
      </div>
    </Portal>
  );
};
