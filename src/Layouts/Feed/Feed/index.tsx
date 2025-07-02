"use client";
import { use, useMemo } from "react";
import { BoundedContent } from "Components/BoundedContent";
import { TabsContext } from "Components/Tabs/TabsContext";
import { Propless } from "Types/React";
import { Post } from "../Post";

export const Feed = (_: Propless) => {
  const { panelID, activeTab, toTabID } = use(TabsContext);
  const activeID = useMemo(() => toTabID(activeTab), [toTabID, activeTab]);
  return (
    <BoundedContent
      id={panelID}
      Tag="section"
      role="tabpanel"
      className="feed-content"
      aria-labelledby={activeID}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </BoundedContent>
  );
};
