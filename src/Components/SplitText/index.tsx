import { CSSProperties, ReactNode } from "react";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const SplitText = ({ text, children, renderNode }: Props) => {
  const tokens = text.split("");
  const { length } = tokens.filter(t => t !== "" && t !== " ");
  let charIndex = -1;
  return (
    <div className="split-text">
      {children}
      {tokens.map((letter, i) => {
        if (letter === " ") {
          return (
            <span key={i} aria-hidden>
              &nbsp;
            </span>
          );
        }
        const styles: CSSProperties = {
          "--index": ++charIndex,
          "--length": length,
        };
        return renderNode ? (
          renderNode(letter, styles, i)
        ) : (
          <span key={i} aria-hidden style={styles}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

interface Props extends OptionalChildren {
  text: string;
  renderNode?: Callback<[string, CSSProperties, number], ReactNode>;
}
