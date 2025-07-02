import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const ProfileBio = (_: Propless) => {
  return (
    <div className="profile-bio">
      <div className="profile-bio__user">
        <ReducedLetterSpacing Tag="h1">Erica Figliolia</ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="span">@ericafigliolia</ReducedLetterSpacing>
      </div>
      <p>
        A profile bio about things and stuff. With more text about things and
        stuff and things
        <br />
        <br />
        <a>Behind The Matches</a>
      </p>
    </div>
  );
};
