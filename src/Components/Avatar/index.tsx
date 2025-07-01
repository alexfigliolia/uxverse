import { FullBleedImage } from "Components/FullBleedImage";
import "./styles.scss";

export const Avatar = () => {
  return (
    <div className="avatar">
      <FullBleedImage src="/profile.jpg" alt="user-avatar" />
    </div>
  );
};
