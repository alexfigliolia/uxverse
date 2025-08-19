import { useCallback, useEffect, useState } from "react";
import { EventEmitter } from "@figliolia/event-emitter";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export function UnfollowButton(props: Props) {
  const [following, setFollowing] = useState(true);

  const action = useCallback(() => {
    setFollowing(f => !f);
  }, []);

  return (
    <UserAction action={action} userType="following" {...props}>
      {following ? "Following" : "Follow"}
    </UserAction>
  );
}

export function BlockButton(props: Props) {
  const [blocked, setBlocked] = useState(false);

  const action = useCallback(() => {
    setBlocked(f => !f);
  }, []);

  return (
    <UserAction action={action} userType="follower" {...props}>
      {blocked ? "Unblock" : "Block"}
    </UserAction>
  );
}

interface Props {
  userID: number;
  emitter: EventEmitter<Record<number, FollowType>>;
}

export type FollowType = "following" | "follower";

function UserAction({
  userID,
  emitter,
  userType,
  action,
  children,
}: ActionProps) {
  useEffect(() => {
    const ID = emitter.on(userID, type => {
      if (type === userType) {
        action();
      }
    });
    return () => {
      emitter.off(userID, ID);
    };
  }, [emitter, userID, action, userType]);

  return (
    <div role="button" onClick={action}>
      {children}
    </div>
  );
}

export interface ActionProps extends Props, OptionalChildren {
  userType: FollowType;
  action: Callback;
}
