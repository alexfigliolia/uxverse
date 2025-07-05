import { StarFilled } from "Icons/Star";
import { Propless } from "Types/React";
import "./styles.scss";

export const Rating = (_: Propless) => {
  return (
    <div className="result-rating" aria-label="5 Stars">
      <StarFilled aria-hidden />
      <span>5</span>
    </div>
  );
};
