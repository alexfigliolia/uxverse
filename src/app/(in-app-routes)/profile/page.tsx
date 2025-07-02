"use client";
import { useCallback, useEffect, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Avatar } from "Components/Avatar";
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
  const [compress, setCompress] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY >= 10) {
      setCompress(true);
    } else {
      setCompress(false);
    }
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const classes = useClassNames("profile-page", { compress });

  return (
    <TabsContextProvider options={TABS}>
      <div className={classes}>
        <div className="profile-page__banner" />
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
