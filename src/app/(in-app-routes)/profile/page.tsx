"use client";
import {
  AvatarUploader,
  BannerWithUploader,
  EditProfile,
  EditProfileProvider,
  ProfilePage,
  ProfileSettingsButton,
} from "Layouts/Profile";
import { Propless } from "Types/React";

export default function Profile(_: Propless) {
  return (
    <EditProfileProvider>
      <ProfilePage
        avatar={<AvatarUploader />}
        Banner={BannerWithUploader}
        editButton={<ProfileSettingsButton />}
      />
      {/* TODO: lazy load */}
      <EditProfile />
    </EditProfileProvider>
  );
}
