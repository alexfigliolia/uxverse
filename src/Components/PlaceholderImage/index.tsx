import { ImageIcon } from "Icons/Image";
import { Propless } from "Types/React";
import "./styles.scss";

export const PlaceholderImage = (_: Propless) => {
  return (
    <div className="placeholder-image">
      <ImageIcon />
    </div>
  );
};
