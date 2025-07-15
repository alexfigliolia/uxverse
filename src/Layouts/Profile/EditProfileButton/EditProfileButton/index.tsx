"use client";
import { use } from "react";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { SettingsFilled } from "Icons/Settings";
import { Propless } from "Types/React";
import { EditProfileContext } from "../../EditProfile/Context";
import "./styles.scss";

export const EditProfileButton = (_: Propless) => {
  const { toggle } = use(EditProfileContext);
  return (
    <button className="edit-profile-button" onClick={toggle.open}>
      <ReducedLetterSpacing Tag="span">Settings</ReducedLetterSpacing>
      <SettingsFilled />
    </button>
  );
};
