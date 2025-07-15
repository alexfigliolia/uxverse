"use client";
import { use } from "react";
import { TabsContext } from "Components/Tabs";
import { useNavigateToPost } from "Hooks/useNavigateToPost";
import { Post } from "Layouts/Feed";
import { Propless } from "Types/React";
import "./styles.scss";

export const ProfilePostList = (_: Propless) => {
  const { panelID } = use(TabsContext);
  const navigate = useNavigateToPost(1, true);
  return (
    <div id={panelID} role="tabpanel" className="profile-post-list">
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
      <Post onClickComments={navigate} />
    </div>
  );
};
