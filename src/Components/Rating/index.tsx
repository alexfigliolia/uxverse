import { StarFilled } from "Icons/Star";
import "./styles.scss";

export const Rating = ({ stars = 5 }: Props) => {
  return (
    <div className="result-rating" aria-label="5 Stars">
      <StarFilled aria-hidden />
      <span>{stars}</span>
    </div>
  );
};

interface Props {
  stars?: number;
}
