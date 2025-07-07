"use client";
import Link from "next/link";
import { use, useId, useMemo } from "react";
import { CloserButton } from "Components/CloserButton";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { InAppBottomSheet } from "Layouts/InApp";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import { ReactionListContext } from "./Context";
import "./styles.scss";

export const ReactionList = (_: Propless) => {
  const titleID = useId();
  const { open, reactions, toggle } = use(ReactionListContext);
  const cacheTrapNode = useMemo(() => createTrapNodeCache(toggle), [toggle]);
  return (
    <InAppBottomSheet
      open={open}
      ref={cacheTrapNode}
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
    </InAppBottomSheet>
  );
};
