"use client";
import { Fragment, use, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { BoundedContent } from "Components/BoundedContent";
import { ReplyContext, withReplyProvider } from "Components/Comments";
import { Post } from "Layouts/Feed";
import { CommentEditor, CommentsTree } from "Layouts/Post";
import { Scrolling } from "Tools/Scrolling";
import { Propless } from "Types/React";
import "./styles.scss";

export default withReplyProvider(function PostPage(_: Propless) {
  const { commenting } = use(ReplyContext);
  const title = useRef<HTMLHeadingElement>(null);
  const [editorHeight, setEditorHeight] = useState(0);

  const onClickComments = useCallback(() => {
    Scrolling.agnosticScrollToNode(title.current);
  }, []);

  const onClickReply = useCallback((node: HTMLLIElement | null) => {
    void Promise.resolve().then(() => {
      Scrolling.agnosticScrollToNode(node, 32);
    });
  }, []);

  const onEditorHeight = useCallback((height: number) => {
    setEditorHeight(height / 2);
  }, []);

  const classes = useClassNames("post-page", { commenting });

  return (
    <Fragment>
      <BoundedContent
        className={classes}
        style={{ "--max-height": `${editorHeight}px` }}>
        <Post onClickComments={onClickComments} />
        <h4 ref={title}>Comments</h4>
        <CommentsTree onClickReply={onClickReply} />
        <CommentEditor onHeight={onEditorHeight} />
      </BoundedContent>
    </Fragment>
  );
});
