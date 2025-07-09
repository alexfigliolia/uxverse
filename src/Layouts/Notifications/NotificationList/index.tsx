import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const NotificationList = ({ children, title }: Props) => {
  return (
    <div className="notification-list">
      <ReducedLetterSpacing Tag="h3">{title}</ReducedLetterSpacing>
      <ul className="notification-list__list">{children}</ul>
    </div>
  );
};

interface Props extends OptionalChildren {
  title: string;
}
