"use client";
import {
  CreatePost,
  CreatePostProvider,
  Gradients,
  Navigation,
  Notifications,
  NotificationsProvider,
} from "Layouts/InApp";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export default function InAppLayout({ children }: OptionalChildren) {
  return (
    <NotificationsProvider>
      <CreatePostProvider>
        <Gradients />
        <Navigation />
        <main className="visitor-app">{children}</main>
        {/* TODO: lazy load */}
        <Notifications />
        <CreatePost />
      </CreatePostProvider>
    </NotificationsProvider>
  );
}
