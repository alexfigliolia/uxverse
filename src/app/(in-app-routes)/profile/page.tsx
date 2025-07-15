"use client";
import {
  AvatarUploader,
  BannerWithUploader,
  EditProfile,
  EditProfileButton,
  EditProfileIconButton,
  EditProfileProvider,
  ProfilePage,
} from "Layouts/Profile";
import { Propless } from "Types/React";

export default function Profile(_: Propless) {
  return (
    <EditProfileProvider>
      <ProfilePage
        avatar={<AvatarUploader />}
        Banner={BannerWithUploader}
        editButton={<EditProfileButton />}
        editIconButton={<EditProfileIconButton />}
      />
      {/* TODO: lazy load */}
      <EditProfile />
    </EditProfileProvider>
  );
}
