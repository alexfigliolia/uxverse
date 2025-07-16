import { ComponentType, ReactNode, RefObject } from "react";
import { useClassNames } from "@figliolia/classnames";
import { MaxHeightObserver } from "Components/MaxHeightObserver";
import { TabsContextProvider } from "Components/Tabs/TabsContext";
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
import { useScrollingAnimation } from "./useScrollingAnimation";
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
  const [triggers, cacheHeaderHeight, imageRef] = useScrollingAnimation();
  const classes = useClassNames("profile-page", triggers);
  return (
    <TabsContextProvider options={TABS}>
      <div className={classes}>
        <BannerSection ref={imageRef} Banner={Banner} />
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
