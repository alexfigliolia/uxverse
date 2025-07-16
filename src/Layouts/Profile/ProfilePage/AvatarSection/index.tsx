import { ReactNode } from "react";
import { UserSocialLinks } from "Components/UserSocialLinks";
import { ProfileStats } from "Layouts/Profile/ProfileStats";
import "./styles.scss";

export const AvatarSection = ({
  avatar,
  editButton,
  profileActions,
  editIconButton,
}: Props) => {
  return (
    <div className="profile-page__avatar">
      {avatar}
      <div className="user-meta">
        <ProfileStats followers={123454367} following={1234} />
        <UserSocialLinks />
        {profileActions}
        {editButton}
        {editIconButton}
      </div>
    </div>
  );
};

export interface Props {
  avatar: ReactNode;
  editButton?: ReactNode;
  editIconButton?: ReactNode;
  profileActions?: ReactNode;
}
