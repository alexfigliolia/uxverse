import { SVGProps } from "react";
import "./styles.scss";

export const SVGGradient = ({ colors, ...rest }: Props) => {
  const { length } = colors;
  return (
    <svg className="svg-gradient" aria-hidden>
      <linearGradient {...rest}>
        {colors.map((c, i) => {
          const offset = i === 0 ? "0%" : `${((length - 1) * 100) / i}%`;
          return <stop key={i} offset={offset} stopColor={c} />;
        })}
      </linearGradient>
    </svg>
  );
};

interface Props extends Omit<SVGProps<SVGGradientElement>, "ref"> {
  colors: string[];
}
