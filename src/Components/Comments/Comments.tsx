"use client";
import { Fragment, useCallback, useState } from "react";
import { LazyLowPriorityRender } from "Components/LowPriorityRender/Lazy";
import { Comment, Reply } from "./Comment";

export const Comments = (props: Reply) => {
  const { replies = [], level = 0, visible } = props;

  const [showReplies, setShowReplies] = useState(false);

  const openReplies = useCallback(() => {
    setShowReplies(true);
  }, []);

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
      />
      <LazyLowPriorityRender>
        {replies.map((reply, i) => (
          <Comments
            {...reply}
            key={i}
            level={level + 1}
            setSize={replies.length}
            visible={visible && showReplies}
          />
        ))}
      </LazyLowPriorityRender>
    </Fragment>
  );
};
