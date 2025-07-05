"use client";
import {
  Gradients,
  Navigation,
  ReactionList,
  ReactionListProvider,
} from "Layouts/InApp";
import { Notifications } from "Layouts/InApp";
import { NotificationsProvider } from "Layouts/InApp/Notifications";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export default function InAppLayout({ children }: OptionalChildren) {
  return (
    <NotificationsProvider>
      <ReactionListProvider>
        <Gradients />
        <Navigation />
        <main className="visitor-app">{children}</main>
        {/* TODO: lazy load */}
        <ReactionList />
        <Notifications />
      </ReactionListProvider>
    </NotificationsProvider>
  );
}
