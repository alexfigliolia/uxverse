"use client";
import Link from "next/link";
import { use, useId } from "react";
import { BottomSheet } from "@figliolia/bottom-sheet";
import { CloserButton } from "Components/CloserButton";
import { Portal } from "Components/Portal";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import { ReactionListContext } from "./Context";
import "./styles.scss";

export const ReactionList = (_: Propless) => {
  const titleID = useId();
  const { open, reactions, toggle } = use(ReactionListContext);

  return (
    <Portal>
      <BottomSheet
        dim
        notch
        open={open}
        close={toggle.close}
        className="reaction-list"
        aria-labelledby={titleID}>
        <CloserButton onClick={toggle.close} />
        <h2 id={titleID}>See who Reacted</h2>
        <ul>
          {reactions.map((reaction, i) => (
            <li key={i}>
              <Link href={`/profile/${reaction.user}`}>
                <ReducedLetterSpacing Tag="span">
                  {reaction.user}
                </ReducedLetterSpacing>
                <span>{reaction.reaction}</span>
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </Portal>
  );
};
