"use client";
import { createContext, useMemo, useState } from "react";
import { useController } from "@figliolia/react-hooks";
import { RenderableMap } from "Tools/RenderableMap";
import { OptionalChildren } from "Types/React";
import { INotificationStack, NotificationStack } from "./NotificationStack";

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: new RenderableMap(),
  stack: new NotificationStack(() => {}),
});

export const NotificationsProvider = ({ children }: OptionalChildren) => {
  const [notifications, setNotifications] = useState<INotificationStack>(
    new RenderableMap(),
  );
  const stack = useController(new NotificationStack(setNotifications));

  const value = useMemo(
    () => ({ stack, notifications }),
    [stack, notifications],
  );

  return <NotificationsContext value={value}>{children}</NotificationsContext>;
};

export interface INotificationsContext {
  stack: NotificationStack;
  notifications: INotificationStack;
}
