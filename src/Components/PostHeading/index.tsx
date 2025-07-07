import { Avatar } from "Components/Avatar";
import { NakedLink } from "Components/NakedLink";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const PostHeading = (_: Propless) => {
  return (
    <div className="post-heading">
      <NakedLink href="/profile">
        <Avatar />
      </NakedLink>
      <div className="meta">
        <NakedLink href="/profile">
          <ReducedLetterSpacing Tag="span">
            Erica Figliolia
          </ReducedLetterSpacing>
        </NakedLink>
        <span>24 minutes ago</span>
      </div>
    </div>
  );
};
