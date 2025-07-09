import { Avatar } from "Components/Avatar";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const UserAvatarWithInfo = ({ children }: OptionalChildren) => {
  return (
    <div className="user-avatar-with-info">
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
      {children}
    </div>
  );
};
