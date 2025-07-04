"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Avatar } from "Components/Avatar";
import { FullBleedImage } from "Components/FullBleedImage";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { GridFilled, GridStroked } from "Icons/Grid";
import { PostFilled, PostStroked } from "Icons/Post";
import {
  ProfileBio,
  ProfileFeed,
  ProfileStats,
  ProfileTab,
  ProfileTabs,
} from "Layouts/Profile";
import { Propless } from "Types/React";
import "./styles.scss";

const TABS: ProfileTab[] = [
  {
    value: "grid",
    label: "grid",
    IconFilled: GridFilled,
    IconStroked: GridStroked,
  },
  {
    value: "posts",
    label: "posts",
    IconFilled: PostFilled,
    IconStroked: PostStroked,
  },
];

export default function Profile(_: Propless) {
  const image = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [compress, setCompress] = useState(false);

  const onScroll = useCallback(() => {
    if (image.current) {
      const progress = Math.max(0, Math.min(window.scrollY, 200)) / 200;
      image.current.style.scale = `${1 + progress / 10}`;
      image.current.style.translate = `0 ${progress * 10}px`;
    }
    if (window.scrollY >= 100) {
      setCompress(true);
    } else {
      setCompress(false);
    }
  }, []);

  useEffect(() => {
    setReady(true);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const classes = useClassNames("profile-page", { ready, compress });

  return (
    <TabsContextProvider options={TABS}>
      <div className={classes}>
        <div className="profile-page__banner">
          <FullBleedImage ref={image} src="/place-1.jpg" />
        </div>
        <div className="profile-page__content">
          <div className="profile-page__content-header">
            <Avatar active />
            <div className="profile-page__content-header-bio">
              <ProfileBio />
              <ProfileStats
                posts={123}
                following={335}
                likes={3000000}
                followers={4353434}
              />
              <ProfileTabs />
            </div>
          </div>
          <ProfileFeed />
        </div>
      </div>
    </TabsContextProvider>
  );
}
