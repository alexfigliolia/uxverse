import dynamic from "next/dynamic";

export * from "./AvatarUploader";
export * from "./Banners";
export * from "./EditProfile";
export * from "./EditProfileButton";
export * from "./FollowingContext";
export * from "./FollowingModal";
export * from "./ProfileActions";
export * from "./ProfilePage";
export * from "./types";

export const ProfilePageComponent = dynamic(
  () => import("./ProfilePage").then(m => m.ProfilePage),
  { ssr: true },
);

export const LazyFollowingModal = dynamic(
  () => import("./FollowingModal").then(v => v.FollowingModal),
  { ssr: false },
);
