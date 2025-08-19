import { Avatar } from "Components/Avatar";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import "./styles.scss";

export const Notification = ({ user, action, at }: Props) => {
  return (
    <div className="uxverse-notification">
      <Avatar />
      <div className="uxverse-notification__action">
        <ReducedLetterSpacing Tag="span">
          <strong>{user}</strong> {action}
        </ReducedLetterSpacing>
        <ReducedLetterSpacing Tag="span">{at}</ReducedLetterSpacing>
      </div>
    </div>
  );
};

interface Props {
  user: string;
  action: string;
  at: string;
}
