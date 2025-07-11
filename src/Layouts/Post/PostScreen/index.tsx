"use client";
import { use } from "react";
import { CloserButton } from "Components/CloserButton";
import {
  CommentsWindowContext,
  withCommentsWindowContext,
} from "Components/Comments";
import { OverscrollDetector } from "Components/OverscrollDetector";
import { PostActions } from "Components/PostActions";
import { Post } from "Layouts/Feed";
import { Propless } from "Types/React";
import { CommentsBottomSheet } from "../CommentsBottomSheet";
import "./styles.scss";

export const PostScreen = withCommentsWindowContext((_: Propless) => {
  const { toggle } = use(CommentsWindowContext);
  return (
    <section className="post-screen">
      <OverscrollDetector Tag="div" className="post-scroll-view">
        <CloserButton onClick={toggle.close} />
        <Post />
        <PostActions likes={32} comments={12} onClickComments={toggle.open} />
      </OverscrollDetector>
      <CommentsBottomSheet />
    </section>
  );
});
