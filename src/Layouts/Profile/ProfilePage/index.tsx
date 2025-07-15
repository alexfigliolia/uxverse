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
        <BannerSection ref={image} Banner={Banner} />
        <div className="profile-page__header">
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
        <ProfileFeed />
      </div>
    </TabsContextProvider>
  );
}

interface Props extends AvatarSectionProps {
  editIconButton?: ReactNode;
  Banner: ComponentType<{ ref: RefObject<HTMLImageElement | null> }>;
}
