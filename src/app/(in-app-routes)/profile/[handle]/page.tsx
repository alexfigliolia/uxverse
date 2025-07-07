"use client";
import { Avatar } from "Components/Avatar";
import { DefaultBanner, ProfilePage } from "Layouts/Profile";
import { Propless } from "Types/React";

export default function Profile(_: Propless) {
  return <ProfilePage avatar={<Avatar />} Banner={DefaultBanner} />;
}
