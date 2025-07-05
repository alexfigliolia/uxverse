"use client";
import { use, useEffect } from "react";
import { Propless } from "Types/React";
import { NotificationsContext } from "./Context";
import { Notification } from "./Notification";
import "./styles.scss";

export const Notifications = (_: Propless) => {
  const { notifications, stack } = use(NotificationsContext);

  useEffect(() => {
    stack.push({
      message:
        "This is a notification with tons and tons and tons and tons and tons and tons and tons and tons and tons and tons and tons of text",
      type: "WARNING",
    });
    stack.push({
      message:
        "This is a notification with tons and tons and tons and tons and tons and tons and tons and tons and tons and tons and tons of text",
      type: "SUCCESS",
    });
    setTimeout(() => {
      stack.push({
        message:
          "This is a notification with tons and tons and tons and tons and tons and tons and tons and tons and tons and tons and tons of text",
        type: "INFO",
      });
      stack.push({
        message:
          "This is a notification with tons and tons and tons and tons and tons and tons and tons and tons and tons and tons and tons of text",
        type: "ERROR",
      });
    }, 2000);
  }, [stack]);

  return (
    <div className="notifications-stack">
      {notifications.map((entry, id) => {
        return <Notification key={id} ID={id} {...entry} />;
      })}
    </div>
  );
};
