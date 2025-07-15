import { NumericalStat } from "Components/NumericalStat";
import "./styles.scss";

export const ProfileStats = ({ followers, following }: Props) => {
  return (
    <div className="profile-stats">
      <div>
        <NumericalStat label="Followers" value={followers} />
      </div>
      <div>
        <NumericalStat label="Following" value={following} />
      </div>
    </div>
  );
};

interface Props {
  followers: number;
  following: number;
}
