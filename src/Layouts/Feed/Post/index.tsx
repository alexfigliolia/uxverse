import { FullBleedImage } from "Components/FullBleedImage";
import { PostActions } from "Components/PostActions";
import { PostHeading } from "Components/PostHeading";
import { Reactions } from "Components/Reactions";
import { Callback } from "Types/Generics";
import { PostText } from "./PostText";
import "./styles.scss";

export const Post = ({ onClickComments }: Props) => {
  return (
    <article className="post">
      <PostHeading />
      <figure>
        <FullBleedImage src="/place-1.jpg" alt="user-image" />
      </figure>
      <div className="post-content">
        <Reactions />
        <PostText />
        <PostActions
          likes={32}
          comments={12}
          onClickComments={onClickComments}
        />
      </div>
    </article>
  );
};

interface Props {
  onClickComments?: Callback;
}
