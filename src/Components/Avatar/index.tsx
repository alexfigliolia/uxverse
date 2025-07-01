import { classnames } from "@figliolia/classnames";
import { FullBleedImage } from "Components/FullBleedImage";
import "./styles.scss";

export const Avatar = ({ active }: Props) => {
  return (
    <div className={classnames("avatar", { active: !!active })}>
      <FullBleedImage src="/profile.jpg" alt="user-avatar" />
    </div>
  );
};

interface Props {
  active?: boolean;
}
