"use client";
import { useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { CommentsFilled, CommentsStroked } from "Icons/Comments";
import { LikesFilled, LikesStroked } from "Icons/Likes";
import { ShareIcon } from "Icons/Share";
import "./styles.scss";

export const PostActions = ({ likes, comments }: Props) => {
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
      <button className="share-button" aria-label="Share this post">
        <ShareIcon aria-hidden />
      </button>
    </div>
  );
};

interface Props {
  likes: number;
  comments: number;
}
