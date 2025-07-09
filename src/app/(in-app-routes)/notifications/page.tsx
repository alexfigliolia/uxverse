"use client";
import { useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { BoundedContent } from "Components/BoundedContent";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { Notification, NotificationList } from "Layouts/Notifications";
import { Propless } from "Types/React";
import "./styles.scss";

export default function Notifications(_: Propless) {
  const [ready, setReady] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [compress, setCompress] = useState(false);

  const isSticky = useCallback(() => {
    return document.body.offsetHeight >= window.innerHeight + 100;
  }, []);

  const onScroll = useCallback(() => {
    const stick = isSticky();
    setReady(true);
    setSticky(stick);
    setCompress(stick && window.scrollY >= 50);
  }, [isSticky]);

  useScrollAnimation(onScroll);

  const classes = useClassNames("notifications-page", {
    ready,
    compress,
    sticky,
  });

  return (
    <BoundedContent className={classes}>
      <div className="notifications-page__heading">
        <ReducedLetterSpacing>Notifications</ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="p">
          You have <strong>3</strong> new notifications
        </ReducedLetterSpacing>
      </div>
      <NotificationList title="Today">
        <li>
          <Notification
            user="Steven Figliolia"
            action="commented on your post"
            at="24 minutes ago"
          />
        </li>
        <li>
          <Notification
            user="George Figliolia"
            action="liked your post"
            at="2 hours ago"
          />
        </li>
      </NotificationList>
      <NotificationList title="Yesterday">
        <li>
          <Notification
            user="Alex Figliolia"
            action="mentioned you in a comment"
            at="Yesterday"
          />
        </li>
      </NotificationList>
      <NotificationList title="This Week">
        <li>
          <Notification
            user="Dana Figliolia"
            action="mentioned you in a comment"
            at="2 days ago"
          />
        </li>
        <li>
          <Notification
            user="Dana Figliolia"
            action="liked your post"
            at="4 days ago"
          />
        </li>
      </NotificationList>
      <NotificationList title="Previous Notifications">
        <li>
          <Notification
            user="Dana Figliolia"
            action="mentioned you in a comment"
            at="2 weeks ago"
          />
        </li>
        <li>
          <Notification
            user="Dana Figliolia"
            action="liked your post"
            at="3 weeks ago"
          />
        </li>
      </NotificationList>
    </BoundedContent>
  );
}
