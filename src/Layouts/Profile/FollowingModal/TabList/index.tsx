"use client";
import { use, useCallback, useMemo } from "react";
import { EventEmitter } from "@figliolia/event-emitter";
import { useController } from "@figliolia/react-hooks";
import { SelectionOrigin } from "Components/ListBox";
import { Tabs, TabsContext } from "Components/Tabs";
import { FollowingContext } from "Layouts/Profile/FollowingContext";
import { Propless } from "Types/React";
import { ConnectedUser } from "./ConnectedUser";
import { List } from "./List";
import { BlockButton, FollowType, UnfollowButton } from "./UserActions";
import "./styles.scss";

export const TabList = (_: Propless) => {
  const { activeTab, panelID } = use(TabsContext);
  const { editable, followers, following, searchFollowers, searchFollowing } =
    use(FollowingContext);
  const translate = useMemo(() => activeTab === "following", [activeTab]);
  const emitter = useController(new EventEmitter<Record<number, FollowType>>());

  const onSelectFollower = useCallback(
    (id: string | number | undefined, origin: SelectionOrigin) => {
      if (typeof id === "number" && origin === "keyboard") {
        emitter.emit(id, "follower");
      }
    },
    [emitter],
  );

  const onSelectFollowing = useCallback(
    (id: string | number | undefined, origin: SelectionOrigin) => {
      if (typeof id === "number" && origin === "keyboard") {
        emitter.emit(id, "following");
      }
    },
    [emitter],
  );

  return (
    <div className="following-lists">
      <div className="following-lists__header">
        <Tabs
          className="following-tabs"
          ariaLabel="View Selector"
          renderTab={({ label }) => label}
        />
      </div>
      <div
        id={panelID}
        role="tabpanel"
        className={translate ? "translate" : undefined}>
        <List
          items={following}
          onSearch={searchFollowing}
          aria-hidden={!translate}
          onSelection={onSelectFollowing}
          renderItem={user => (
            <ConnectedUser key={user.id} {...user}>
              {editable && (
                <UnfollowButton userID={user.id} emitter={emitter} />
              )}
            </ConnectedUser>
          )}
        />
        <List
          items={followers}
          onSearch={searchFollowers}
          aria-hidden={translate}
          onSelection={onSelectFollower}
          renderItem={user => (
            <ConnectedUser key={user.id} {...user}>
              {editable && <BlockButton userID={user.id} emitter={emitter} />}
            </ConnectedUser>
          )}
        />
      </div>
    </div>
  );
};
