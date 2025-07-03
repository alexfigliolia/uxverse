"use client";
import { use, useCallback } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { ReactionListContext } from "Layouts/InApp";
import { Formatting } from "Tools/Formatting";
import { Propless } from "Types/React";
import "./styles.scss";

export const Reactions = (_: Propless) => {
  const { toggle, setReactions } = use(ReactionListContext);

  const onClick = useCallback(() => {
    toggle.open();
    setReactions(
      Array.from({ length: 50 }, () => ({
        user: "@ericafigliolia",
        reaction: ["😀", "❤️", "😍", "👌", "😋"][Math.floor(Math.random() * 5)],
      })),
    );
  }, [toggle, setReactions]);

  return (
    <button
      className="reactions"
      onClick={onClick}
      aria-label="Reacted to by 25 people. Click to view all">
      <div aria-hidden>
        <span>😀</span>
        <span>😍</span>
        <span>😭</span>
        <span>😉</span>
      </div>
      <span aria-hidden>
        by <ReducedLetterSpacing Tag="strong">Someone</ReducedLetterSpacing> and{" "}
        <ReducedLetterSpacing Tag="strong">
          {Formatting.formatCompact(25)} others
        </ReducedLetterSpacing>
      </span>
    </button>
  );
};
