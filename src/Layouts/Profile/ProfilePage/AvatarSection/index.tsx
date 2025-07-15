import { ReactNode } from "react";
import { UserSocialLinksGray } from "Components/UserSocialLinks";
import { ProfileStats } from "Layouts/Profile/ProfileStats";
import "./styles.scss";

export const AvatarSection = ({
  avatar,
  editButton,
  profileActions,
}: Props) => {
  return (
    <div className="profile-page__avatar">
      {avatar}
      <div className="user-meta">
        <ProfileStats followers={123454367} following={1234} />
        <UserSocialLinksGray />
        {profileActions}
        {editButton}
      </div>
    </div>
  );
};

export interface Props {
  avatar: ReactNode;
  editButton?: ReactNode;
  profileActions?: ReactNode;
}
