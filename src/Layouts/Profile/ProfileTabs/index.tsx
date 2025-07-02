"use client";
import { Tabs } from "Components/Tabs";
import { Propless } from "Types/React";
import { ProfileTab } from "../types";
import "./styles.scss";

export const ProfileTabs = (_: Propless) => {
  return (
    <Tabs<ProfileTab>
      className="profile-tabs"
      ariaLabel="View Selector"
      renderTab={({ IconStroked, IconFilled }) => (
        <div>
          <IconStroked aria-hidden />
          <IconFilled aria-hidden />
        </div>
      )}
    />
  );
};
