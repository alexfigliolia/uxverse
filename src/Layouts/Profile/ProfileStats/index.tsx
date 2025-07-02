import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Formatting } from "Tools/Formatting";
import "./styles.scss";

export const ProfileStats = ({ posts, followers, following, likes }: Props) => {
  return (
    <div className="profile-stats">
      <div>
        <ReducedLetterSpacing Tag="span">
          {Formatting.formatCompact(posts)}
        </ReducedLetterSpacing>
        <span>Posts</span>
      </div>
      <div>
        <ReducedLetterSpacing Tag="span">
          {Formatting.formatCompact(followers)}
        </ReducedLetterSpacing>
        <span>Followers</span>
      </div>
      <div>
        <ReducedLetterSpacing Tag="span">
          {Formatting.formatCompact(following)}
        </ReducedLetterSpacing>
        <span>Following</span>
      </div>
      <div>
        <ReducedLetterSpacing Tag="span">
          {Formatting.formatCompact(likes)}
        </ReducedLetterSpacing>
        <span>Likes</span>
      </div>
    </div>
  );
};

interface Props {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}
