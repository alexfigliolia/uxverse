import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Formatting } from "Tools/Formatting";
import "./styles.scss";

export const NumericalStat = ({ label, value }: Props) => {
  return (
    <div className="numerical-stat">
      <ReducedLetterSpacing Tag="span">
        {Formatting.formatCompact(value)}
      </ReducedLetterSpacing>
      <ReducedLetterSpacing Tag="span">{label}</ReducedLetterSpacing>
    </div>
  );
};

interface Props {
  label: string;
  value: number;
}
