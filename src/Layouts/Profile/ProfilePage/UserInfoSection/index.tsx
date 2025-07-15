import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const UserInfoSection = (_: Propless) => {
  return (
    <div className="profile-page__user-info">
      <div className="usernames">
        <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="span">@ericafigliolia</ReducedLetterSpacing>
      </div>
      <EditorContentRenderer />
    </div>
  );
};
