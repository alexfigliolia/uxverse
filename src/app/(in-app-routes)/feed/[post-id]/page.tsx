"use client";
import { Fragment, use, useCallback } from "react";
import { BoundedContent } from "Components/BoundedContent";
import {
  CommentsWindowContext,
  ReplyProvider,
  withCommentsWindowContext,
} from "Components/Comments";
import { Post } from "Layouts/Feed";
import { CommentsTree } from "Layouts/Post";
import { Propless } from "Types/React";
import "./styles.scss";

export default withCommentsWindowContext(function PostPage(_: Propless) {
  const { toggle } = use(CommentsWindowContext);

  const onClickReply = useCallback((node: HTMLLIElement | null) => {
    if (typeof window !== "undefined" && node) {
      window.scrollTo({
        top:
          node.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          32,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <Fragment>
      <BoundedContent className="post-page">
        <Post onClickComments={toggle.open} />
        <h4>Comments</h4>
        <ReplyProvider>
          <CommentsTree onClickReply={onClickReply} />
        </ReplyProvider>
      </BoundedContent>
    </Fragment>
  );
});
