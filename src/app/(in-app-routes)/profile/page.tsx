"use client";
import { Avatar } from "Components/Avatar";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { GridFilled, GridStroked } from "Icons/Grid";
import { PostFilled, PostStroked } from "Icons/Post";
import {
  ProfileBio,
  ProfileFeed,
  ProfileStats,
  ProfileTab,
  ProfileTabs,
} from "Layouts/Profile";
import { Propless } from "Types/React";
import "./styles.scss";

const TABS: ProfileTab[] = [
  {
    value: "grid",
    label: "grid",
    IconFilled: GridFilled,
    IconStroked: GridStroked,
  },
  {
    value: "posts",
    label: "posts",
    IconFilled: PostFilled,
    IconStroked: PostStroked,
  },
];

export default function Profile(_: Propless) {
  return (
    <TabsContextProvider options={TABS}>
      <div className="profile-banner-image" />
      <div className="profile-content">
        <div className="profile-content__header">
          <Avatar active />
          <div className="profile-content__user-info">
            <ProfileBio />
            <ProfileStats
              posts={123}
              following={335}
              likes={3000000}
              followers={4353434}
            />
            <ProfileTabs />
          </div>
        </div>
        <ProfileFeed />
      </div>
    </TabsContextProvider>
  );
}
