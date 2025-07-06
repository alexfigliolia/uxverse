"use client";
import { useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { CommentsFilled, CommentsStroked } from "Icons/Comments";
import { LikesFilled, LikesStroked } from "Icons/Likes";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PostActions = ({ likes, comments, children }: Props) => {
  const [liked, _1] = useState(false);
  const [commented, _2] = useState(false);
  const classes = useClassNames("post-actions", { liked, commented });
  return (
    <div className={classes}>
      <button className="reaction-button">
        <div className="icons-likes">
          <LikesStroked aria-hidden />
          <LikesFilled aria-hidden />
        </div>
        <span>
          <ReducedLetterSpacing Tag="strong">{likes}</ReducedLetterSpacing>{" "}
          Likes
        </span>
      </button>
      <button className="reaction-button">
        <div className="icons-comments">
          <CommentsStroked aria-hidden />
          <CommentsFilled aria-hidden />
        </div>
        <span>
          <ReducedLetterSpacing Tag="strong">{comments}</ReducedLetterSpacing>{" "}
          Comments
        </span>
      </button>
      {children}
    </div>
  );
};

interface Props extends OptionalChildren {
  likes: number;
  comments: number;
}
