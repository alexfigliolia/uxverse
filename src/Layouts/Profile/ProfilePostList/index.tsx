"use client";
import { use } from "react";
import { TabsContext } from "Components/Tabs";
import { Post } from "Layouts/Feed";
import { Propless } from "Types/React";
import "./styles.scss";

export const ProfilePostList = (_: Propless) => {
  const { panelID } = use(TabsContext);
  return (
    <div id={panelID} role="tabpanel" className="profile-post-list">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};
