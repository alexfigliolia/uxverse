import dynamic from "next/dynamic";

export * from "./AvatarUploader";
export * from "./Banners";
export * from "./EditProfile";
export * from "./EditProfileButton";
export * from "./ProfileActions";
export * from "./ProfilePage";
export * from "./types";

export const ProfilePageComponent = dynamic(
  () => import("./ProfilePage").then(m => m.ProfilePage),
  { ssr: true },
);
