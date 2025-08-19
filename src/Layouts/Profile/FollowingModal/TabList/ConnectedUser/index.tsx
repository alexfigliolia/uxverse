import { Avatar } from "Components/Avatar";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { IUser } from "Layouts/Profile/FollowingContext";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ConnectedUser = ({ name, handle, avatar, children }: Props) => {
  return (
    <div className="connected-user">
      <div>
        <Avatar src={avatar} />
        <div>
          <ReducedLetterSpacing Tag="span">{name}</ReducedLetterSpacing>
          <ReducedLetterSpacing Tag="span">{handle}</ReducedLetterSpacing>
        </div>
      </div>
      {children}
    </div>
  );
};

interface Props extends IUser, OptionalChildren {}
