import { Avatar } from "Components/Avatar";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const Header = (_: Propless) => {
  return (
    <div className="create-post__header">
      <div>
        <Avatar active />
        <div>
          <ReducedLetterSpacing Tag="span">
            Erica Figliolia
          </ReducedLetterSpacing>
          <ReducedLetterSpacing Tag="span">
            @ericafigliolia
          </ReducedLetterSpacing>
        </div>
      </div>
      <GradientBorderButton text="post" />
    </div>
  );
};
