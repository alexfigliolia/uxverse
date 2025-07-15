"use client";
import { use } from "react";
import { SettingsStroked } from "Icons/Settings";
import { EditProfileContext } from "Layouts/Profile/EditProfile/Context";
import { Propless } from "Types/React";
import "./styles.scss";

export const EditProfileIconButton = (_: Propless) => {
  const { toggle } = use(EditProfileContext);
  return (
    <button
      onClick={toggle.open}
      className="edit-profile-icon-button"
      aria-label="Open Profile Settings">
      <SettingsStroked aria-hidden />
      <SettingsStroked aria-hidden />
    </button>
  );
};
