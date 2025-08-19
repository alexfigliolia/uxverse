"use client";
import { use, useCallback } from "react";
import { NumericalStat } from "Components/NumericalStat";
import { FollowingContext } from "../FollowingContext";
import "./styles.scss";

export const ProfileStats = ({ followers, following }: Props) => {
  const { toggle } = use(FollowingContext);

  const onClickFollowers = useCallback(() => {
    toggle.open("followers");
  }, [toggle]);

  const onClickFollowing = useCallback(() => {
    toggle.open("following");
  }, [toggle]);

  return (
    <div className="profile-stats">
      <button onClick={onClickFollowers}>
        <NumericalStat label="Followers" value={followers} />
      </button>
      <button onClick={onClickFollowing}>
        <NumericalStat label="Following" value={following} />
      </button>
    </div>
  );
};

interface Props {
  followers: number;
  following: number;
}
