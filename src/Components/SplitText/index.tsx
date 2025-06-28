import "./styles.scss";

export const SplitText = ({ text }: Props) => {
  const tokens = text.split("");
  const { length } = tokens.filter(t => t !== "" && t !== " ");
  let charIndex = -1;
  return (
    <div className="split-text">
      {tokens.map((letter, i) => {
        if (letter === " ") {
          return (
            <span key={i} aria-hidden>
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden
            style={{ "--index": ++charIndex, "--length": length }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

interface Props {
  text: string;
}
