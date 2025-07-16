import { ReactNode } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { ProfileBioRenderer } from "./ProfileBioRenderer";
import "./styles.scss";

export const UserInfoSection = ({ profileActions }: Props) => {
  return (
    <div className="profile-page__user-info">
      <div className="usernames">
        <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="span">@ericafigliolia</ReducedLetterSpacing>
      </div>
      <ProfileBioRenderer />
      {profileActions}
    </div>
  );
};

interface Props {
  profileActions?: ReactNode;
}
