"use client";
import {
  CreatePost,
  CreatePostProvider,
  Gradients,
  Navigation,
  Notifications,
  NotificationsProvider,
  ReactionList,
  ReactionListProvider,
} from "Layouts/InApp";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export default function InAppLayout({ children }: OptionalChildren) {
  return (
    <NotificationsProvider>
      <ReactionListProvider>
        <CreatePostProvider>
          <Gradients />
          <Navigation />
          <main className="visitor-app">{children}</main>
          {/* TODO: lazy load */}
          <ReactionList />
          <Notifications />
          <CreatePost />
        </CreatePostProvider>
      </ReactionListProvider>
    </NotificationsProvider>
  );
}
