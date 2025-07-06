"use client";
import { useCallback, useEffect, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { Propless } from "Types/React";
import { FeedTabs } from "./FeedTabs";
import { RecentlyActive } from "./RecentlyActive";
import "./styles.scss";

export const Header = (_: Propless) => {
  const [enabled, setEnabled] = useState(false);
  const [compress, setCompress] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY >= 200) {
      setCompress(true);
    } else {
      setCompress(false);
    }
  }, []);

  useScrollAnimation(onScroll);

  useEffect(() => {
    setEnabled(true);
  }, []);

  const classes = useClassNames("feed-header", { enabled, compress });

  return (
    <header className={classes}>
      <RecentlyActive />
      <FeedTabs />
    </header>
  );
};
