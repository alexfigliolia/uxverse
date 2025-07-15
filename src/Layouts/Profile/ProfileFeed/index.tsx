"use client";
import { use } from "react";
import { ITabsContext, TabsContext } from "Components/Tabs";
import { Propless } from "Types/React";
import { ProfileGrid } from "../ProfileGrid";
import { ProfilePostList } from "../ProfilePostList";
import { ProfileTab } from "../types";
import "./styles.scss";

export const ProfileFeed = (_: Propless) => {
  const { activeTab } = use(TabsContext) as ITabsContext<ProfileTab>;
  return (
    <div className="profile-feed">
      {activeTab === "grid" ? <ProfileGrid /> : <ProfilePostList />}
    </div>
  );
};
