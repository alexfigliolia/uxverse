import { FullBleedImage } from "Components/FullBleedImage";
import { PostActions } from "Components/PostActions";
import { PostHeading } from "Components/PostHeading";
import { Reactions } from "Components/Reactions";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const Post = (_: Propless) => {
  return (
    <article className="post">
      <PostHeading />
      <figure>
        <FullBleedImage src="/place-1.jpg" alt="user-image" />
      </figure>
      <div className="post-content">
        <Reactions />
        <p>
          <ReducedLetterSpacing Tag="strong">
            Erica Figliolia&nbsp;&nbsp;
          </ReducedLetterSpacing>
          Blah blah blah about stuff and things. Post about stuff and things
        </p>
        <PostActions likes={32} comments={12} />
      </div>
    </article>
  );
};
