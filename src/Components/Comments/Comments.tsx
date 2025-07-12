"use client";
import { Fragment, useCallback, useState } from "react";
import { LazyLowPriorityRender } from "Components/LowPriorityRender/Lazy";
import { Callback } from "Types/Generics";
import { Comment, type Props as CommentProps } from "./Comment";

export const Comments = (props: Props) => {
  const {
    replies = [],
    level = 0,
    visible,
    onClickReply,
    openReplies: openParentReplies = () => {},
  } = props;

  const [showReplies, setShowReplies] = useState(false);

  const openReplies = useCallback(() => {
    openParentReplies();
    setShowReplies(true);
  }, [openParentReplies]);

  const closeReplies = useCallback(() => {
    setShowReplies(false);
  }, []);

  return (
    <Fragment>
      <Comment
        {...props}
        expanded={showReplies}
        openReplies={openReplies}
        closeReplies={closeReplies}
        openParents={openParentReplies}
      />
      <LazyLowPriorityRender>
        {replies.map((reply, i) => (
          <Comments
            {...reply}
            key={i}
            level={level + 1}
            setSize={replies.length}
            openReplies={openReplies}
            onClickReply={onClickReply}
            visible={visible && showReplies}
          />
        ))}
      </LazyLowPriorityRender>
    </Fragment>
  );
};

interface Props
  extends Omit<CommentProps, "closeReplies" | "openReplies" | "openParents"> {
  openReplies?: Callback;
}
