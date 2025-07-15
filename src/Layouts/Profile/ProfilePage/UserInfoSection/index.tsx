import { ReactNode } from "react";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import "./styles.scss";

export const UserInfoSection = ({ profileActions }: Props) => {
  return (
    <div className="profile-page__user-info">
      <div className="usernames">
        <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="span">@ericafigliolia</ReducedLetterSpacing>
      </div>
      <EditorContentRenderer />
      {profileActions}
    </div>
  );
};

interface Props {
  profileActions?: ReactNode;
}
