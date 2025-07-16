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
import { MaxHeightObserver } from "Components/MaxHeightObserver";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { useScrollAnimation } from "Hooks/useScrollAnimation";
import { GridFilled, GridStroked } from "Icons/Grid";
import { PostFilled, PostStroked } from "Icons/Post";
import { ProfileFeed } from "../ProfileFeed";
import { ProfileTabs } from "../ProfileTabs";
import { ProfileTab } from "../types";
import {
  AvatarSection,
  type Props as AvatarSectionProps,
} from "./AvatarSection";
import { BannerSection } from "./BannerSection";
import { UserInfoSection } from "./UserInfoSection";
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
  editIconButton,
  profileActions,
}: Props) {
  const headerHeight = useRef(0);
  const previousPosition = useRef(0);
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
    const direction = window.scrollY > previousPosition.current ? 1 : -1;
    previousPosition.current = window.scrollY;
    if (direction === 1 && window.scrollY >= headerHeight.current * 0.75) {
      setCompress(true);
    } else if (direction === -1 && window.scrollY < threshold * 1.5) {
      setCompress(false);
    }
  }, []);

  useScrollAnimation(onScroll);

  useEffect(() => {
    setReady(true);
  }, []);

  const cacheHeaderHeight = useCallback((height: number) => {
    headerHeight.current = height;
  }, []);

  const classes = useClassNames("profile-page", { ready, compress });

  return (
    <TabsContextProvider options={TABS}>
      <div className={classes}>
        <BannerSection ref={image} Banner={Banner} />
        <MaxHeightObserver onHeight={cacheHeaderHeight}>
          {(ref, height) => (
            <div
              ref={ref}
              className="profile-page__header"
              style={{ "--max-height": height }}>
              <div className="profile-page__content">
                <AvatarSection
                  avatar={avatar}
                  editButton={editButton}
                  editIconButton={editIconButton}
                  profileActions={profileActions}
                />
                <UserInfoSection profileActions={profileActions} />
              </div>
              <ProfileTabs />
            </div>
          )}
        </MaxHeightObserver>
        <ProfileFeed />
      </div>
    </TabsContextProvider>
  );
}

interface Props extends AvatarSectionProps {
  editIconButton?: ReactNode;
  Banner: ComponentType<{ ref: RefObject<HTMLImageElement | null> }>;
}
