import { HTMLProps } from "react";
import { Comments } from "Components/Comments";
import { Replies } from "./Replies";
import "./styles.scss";

export const CommentsTree = (
  props: Omit<HTMLProps<HTMLUListElement>, "role" | "className" | "aria-label">,
) => {
  return (
    <ul
      role="tree"
      className="comments-tree"
      aria-label="Comment Section"
      {...props}>
      {Replies.map(comment => {
        return (
          <Comments
            visible
            id={comment.id}
            key={comment.id}
            replies={comment.replies}
            comment={comment.comment}
          />
        );
      })}
    </ul>
  );
};
