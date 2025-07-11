import { HTMLProps } from "react";
import { Comments } from "Components/Comments";
import type { Callback } from "Types/Generics";
import { Replies } from "./Replies";
import "./styles.scss";

export const CommentsTree = ({ onClickReply, ...rest }: Props) => {
  return (
    <ul
      role="tree"
      className="comments-tree"
      aria-label="Comment Section"
      {...rest}>
      {Replies.map(comment => {
        return (
          <Comments
            visible
            id={comment.id}
            key={comment.id}
            replies={comment.replies}
            comment={comment.comment}
            onClickReply={onClickReply}
          />
        );
      })}
    </ul>
  );
};

interface Props
  extends Omit<
    HTMLProps<HTMLUListElement>,
    "role" | "className" | "aria-label"
  > {
  onClickReply?: Callback<[HTMLLIElement | null]>;
}
