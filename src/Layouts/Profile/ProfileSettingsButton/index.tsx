"use client";
import { use } from "react";
import { SettingsStroked } from "Icons/Settings";
import { Propless } from "Types/React";
import { EditProfileContext } from "../EditProfile";
import "./styles.scss";

export const ProfileSettingsButton = (_: Propless) => {
  const { toggle } = use(EditProfileContext);
  return (
    <button
      onClick={toggle.open}
      className="profile-settings-button"
      aria-label="Open Profile Settings">
      <SettingsStroked aria-hidden />
      <SettingsStroked aria-hidden />
    </button>
  );
};
