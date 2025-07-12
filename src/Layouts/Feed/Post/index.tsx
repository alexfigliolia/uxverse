import { FullBleedImage } from "Components/FullBleedImage";
import { OverscrollDetector } from "Components/OverscrollDetector";
import { PostActions } from "Components/PostActions";
import { PostHeading } from "Components/PostHeading";
import { Reactions } from "Components/Reactions";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Callback } from "Types/Generics";
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
        <OverscrollDetector Tag="p">
          <ReducedLetterSpacing Tag="strong">
            Erica Figliolia&nbsp;
          </ReducedLetterSpacing>
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
          Blah blah blah about stuff and things. Post about stuff and things
        </OverscrollDetector>
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
