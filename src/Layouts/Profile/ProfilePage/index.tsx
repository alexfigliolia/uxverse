"use client";
import {
  ComponentType,
  Fragment,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { GridFilled, GridStroked } from "Icons/Grid";
import { PostFilled, PostStroked } from "Icons/Post";
import {
  ProfileBio,
  ProfileFeed,
  ProfileStats,
  ProfileTab,
  ProfileTabs,
} from "Layouts/Profile";
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

export function ProfilePage({ avatar, Banner, editButton }: Props) {
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
        <div className="profile-page__content">
          <div className="profile-page__content-header">
            <div className="profile-page__bio">
              <div className="profile-page__avatar">{avatar}</div>
              <ProfileBio>
                <Fragment>
                  {editButton}
                  <ProfileStats
                    posts={123}
                    following={335}
                    likes={3000000}
                    followers={4353434}
                  />
                </Fragment>
              </ProfileBio>
            </div>
            <div className="profile-page__feed-group">
              <ProfileTabs />
            </div>
          </div>
          <ProfileFeed />
        </div>
      </div>
    </TabsContextProvider>
  );
}

interface Props {
  avatar: ReactNode;
  editButton?: ReactNode;
  Banner: ComponentType<{ ref: RefObject<HTMLImageElement | null> }>;
}
