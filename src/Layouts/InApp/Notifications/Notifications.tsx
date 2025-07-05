"use client";
import { use } from "react";
import { Propless } from "Types/React";
import { NotificationsContext } from "./Context";
import { Notification } from "./Notification";
import "./styles.scss";

export const Notifications = (_: Propless) => {
  const { notifications } = use(NotificationsContext);

  return (
    <div className="notifications-stack">
      {notifications.map((entry, id) => {
        return <Notification key={id} ID={id} {...entry} />;
      })}
    </div>
  );
};
