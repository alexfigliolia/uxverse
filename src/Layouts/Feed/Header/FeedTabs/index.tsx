"use client";
import { useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Propless } from "Types/React";
import "./styles.scss";

export const FeedTabs = (_: Propless) => {
  const [active, setActive] = useState<Tab>("feed");
  const classes = useClassNames("feed-tabs", {
    location: active === "location",
  });

  const toFeed = useCallback(() => {
    setActive("feed");
  }, []);

  const toLocation = useCallback(() => {
    setActive("location");
  }, []);

  return (
    <div className={classes}>
      <div aria-hidden className="underline" />
      <button onClick={toFeed}>
        <ReducedLetterSpacing Tag="span">Feed</ReducedLetterSpacing>
      </button>
      <button onClick={toLocation}>
        <ReducedLetterSpacing Tag="span">My Location</ReducedLetterSpacing>
      </button>
    </div>
  );
};

type Tab = "feed" | "location";
