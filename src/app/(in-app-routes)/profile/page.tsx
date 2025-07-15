"use client";
import {
  AvatarUploader,
  BannerWithUploader,
  EditProfile,
  EditProfileProvider,
  ProfilePage,
} from "Layouts/Profile";
import { EditProfileButton } from "Layouts/Profile/EditProfileButton";
import { Propless } from "Types/React";

export default function Profile(_: Propless) {
  return (
    <EditProfileProvider>
      <ProfilePage
        avatar={<AvatarUploader />}
        Banner={BannerWithUploader}
        editButton={<EditProfileButton />}
      />
      {/* TODO: lazy load */}
      <EditProfile />
    </EditProfileProvider>
  );
}
