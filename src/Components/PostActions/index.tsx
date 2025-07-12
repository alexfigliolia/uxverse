"use client";
import { useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { ShareButton } from "Components/ShareButton";
import { CommentsFilled, CommentsStroked } from "Icons/Comments";
import { LikesFilled, LikesStroked } from "Icons/Likes";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PostActions = ({
  likes,
  children,
  comments,
  className,
  commentId,
  onClickComments,
  commentType = "Comment",
  commentTypePlural = "Comments",
  conditionalComments = false,
}: Props) => {
  const [liked, _1] = useState(false);
  const [commented, _2] = useState(false);
  const classes = useClassNames("post-actions", className, {
    liked,
    commented,
  });
  const type = useMemo(
    () => (typeof commentId === "number" ? "comment" : "post"),
    [commentId],
  );
  return (
    <div className={classes}>
      <button className="reaction-button">
        <div className="icons-likes">
          <LikesStroked aria-hidden />
          <LikesFilled aria-hidden />
        </div>
        <span>
          <ReducedLetterSpacing Tag="strong">{likes}</ReducedLetterSpacing>{" "}
          {likes === 1 ? "Like" : "Likes"}
        </span>
      </button>
      {(!conditionalComments || comments !== 0) && (
        <button className="reaction-button" onClick={onClickComments}>
          <div className="icons-comments">
            <CommentsStroked aria-hidden />
            <CommentsFilled aria-hidden />
          </div>
          <span>
            <ReducedLetterSpacing Tag="strong">{comments}</ReducedLetterSpacing>{" "}
            {comments === 1 ? commentType : commentTypePlural}
          </span>
        </button>
      )}
      {children}
      <ShareButton
        aria-label={`Share this ${type}`}
        shareData={{
          title: `Erica Figliolia's ${type}`,
          text: `Check out this ${type} on visitor`,
          url: `${process.env.NEXT_PUBLIC_URL}/feed/${1}${type === "comment" ? `?comment=${commentId}` : ""}`,
        }}
      />
    </div>
  );
};

interface Props extends OptionalChildren {
  likes: number;
  comments: number;
  className?: string;
  commentId?: number;
  onClickComments?: Callback;
  conditionalComments?: boolean;
  commentType?: "Comment" | "Reply";
  commentTypePlural?: "Comments" | "Replies";
}
