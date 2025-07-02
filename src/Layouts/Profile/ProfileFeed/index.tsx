"use client";
import { use } from "react";
import { ITabsContext, TabsContext } from "Components/Tabs";
import { Propless } from "Types/React";
import { ProfileGrid } from "../ProfileGrid";
import { ProfilePostList } from "../ProfilePostList";
import { ProfileTab } from "../types";

export const ProfileFeed = (_: Propless) => {
  const { activeTab } = use(TabsContext) as ITabsContext<ProfileTab>;
  return activeTab === "grid" ? <ProfileGrid /> : <ProfilePostList />;
};
