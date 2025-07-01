import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const Reactions = (_: Propless) => {
  return (
    <div className="reactions">
      <div aria-hidden>
        <span>😀</span>
        <span>😍</span>
        <span>😭</span>
        <span>😉</span>
      </div>
      <span>
        by <ReducedLetterSpacing Tag="strong">Someone</ReducedLetterSpacing> and{" "}
        <ReducedLetterSpacing Tag="strong">others</ReducedLetterSpacing>
      </span>
    </div>
  );
};
