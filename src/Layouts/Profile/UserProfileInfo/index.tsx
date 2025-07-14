import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { UserSocialLinks } from "Components/SocialLinks";
import { Propless } from "Types/React";
import "./styles.scss";

export const UserProfileInfo = (_: Propless) => {
  return (
    <div className="user-profile-info">
      <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
      <ReducedLetterSpacing Tag="span">@ericafigliolia</ReducedLetterSpacing>
      <UserSocialLinks />
    </div>
  );
};
