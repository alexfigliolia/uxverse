"use client";
import { Fragment, use, useCallback, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { BoundedContent } from "Components/BoundedContent";
import { ReplyContext, withReplyProvider } from "Components/Comments";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Suspended } from "HOCs/Suspended";
import { useCommentParam } from "Hooks/useCommentParam";
import { Post } from "Layouts/Feed";
import { CommentEditor, CommentsTree } from "Layouts/Post";
import { Scrolling } from "Tools/Scrolling";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import "./styles.scss";

export default Suspended(
  withReplyProvider(function PostPage(_: Propless) {
    const timeout = useTimeout();
    const { commenting } = use(ReplyContext);
    const title = useRef<HTMLHeadingElement>(null);
    const [editorHeight, setEditorHeight] = useState(0);

    const conditionallyDelay = useCallback(
      (fn: Callback, wait = false) => {
        timeout.execute(() => fn(), wait ? 500 : 0);
      },
      [timeout],
    );

    const scrollToComments = useCallback(
      (wait = false) => {
        conditionallyDelay(
          () => Scrolling.scrollWindowToNode(title.current),
          wait,
        );
      },
      [conditionallyDelay],
    );

    const onClickReply = useCallback(
      (node: HTMLLIElement | null, wait: boolean = false) => {
        conditionallyDelay(() => Scrolling.scrollWindowToNode(node, 32), wait);
      },
      [conditionallyDelay],
    );

    const onEditorHeight = useCallback((height: number) => {
      setEditorHeight(height / 2);
    }, []);

    const onCommentParam = useCallback(() => {
      scrollToComments(true);
    }, [scrollToComments]);

    const onClickComments = useCallback(() => {
      scrollToComments();
    }, [scrollToComments]);

    useCommentParam(onCommentParam);

    const classes = useClassNames("post-page", { commenting });

    return (
      <Fragment>
        <BoundedContent
          className={classes}
          style={{ "--max-height": `${editorHeight}px` }}>
          <Post onClickComments={onClickComments} />
          <ReducedLetterSpacing ref={title} Tag="h4">
            Comments
          </ReducedLetterSpacing>
          <CommentsTree onClickReply={onClickReply} />
          <CommentEditor onHeight={onEditorHeight} />
        </BoundedContent>
      </Fragment>
    );
  }),
);
