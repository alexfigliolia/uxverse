"use client";
import {
  ComponentType,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { UserSocialLinks } from "Components/UserSocialLinks";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { GridFilled, GridStroked } from "Icons/Grid";
import { PostFilled, PostStroked } from "Icons/Post";
import {
  ProfileFeed,
  ProfileStats,
  ProfileTab,
  ProfileTabs,
} from "Layouts/Profile";
import { UserProfileInfo } from "../UserProfileInfo";
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

export function ProfilePage({
  avatar,
  Banner,
  editButton,
  profileActions,
}: Props) {
  const image = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [compress, setCompress] = useState(false);

  const onScroll = useCallback(() => {
    let threshold = 200;
    if (image.current) {
      threshold = image.current.getBoundingClientRect().height;
      const progress =
        Math.max(0, Math.min(window.scrollY, threshold)) / threshold;
      image.current.style.opacity = `${1 - progress / 4}`;
      image.current.style.scale = `${1 + progress / 10}`;
      image.current.style.translate = `0 ${progress * 10}px`;
    }
    if (window.scrollY >= threshold / 2) {
      setCompress(true);
    } else {
      setCompress(false);
    }
  }, []);

  useScrollAnimation(onScroll);

  useEffect(() => {
    setReady(true);
  }, []);

  const classes = useClassNames("profile-page", { ready, compress });

  return (
    <TabsContextProvider options={TABS}>
      <div className={classes}>
        <div className="profile-page__banner">
          <Banner ref={image} />
        </div>
        <div className="profile-page__avatar">{avatar}</div>
        <div className="profile-page__header">
          <div className="profile-page__avatar">
            {avatar}
            <UserSocialLinks />
            {profileActions}
          </div>
          <div className="profile-page__bio">
            {editButton}
            <UserProfileInfo />
            <UserSocialLinks />
            <ProfileStats
              likes={1233424}
              followers={12323342}
              following={123}
              posts={123}
            />
            {profileActions}
            <EditorContentRenderer />
          </div>
          <div className="profile-page__tabs">
            <ProfileTabs />
          </div>
        </div>
        <div className="profile-page__content">
          <ProfileFeed />
        </div>
      </div>
    </TabsContextProvider>
  );
}

interface Props {
  avatar: ReactNode;
  editButton?: ReactNode;
  profileActions?: ReactNode;
  Banner: ComponentType<{ ref: RefObject<HTMLImageElement | null> }>;
}
