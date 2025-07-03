import { Avatar } from "Components/Avatar";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const PostHeading = (_: Propless) => {
  return (
    <div className="post-heading">
      <Avatar />
      <div className="meta">
        <ReducedLetterSpacing Tag="span">Erica Figliolia</ReducedLetterSpacing>
        <span>24 minutes ago</span>
      </div>
    </div>
  );
};
