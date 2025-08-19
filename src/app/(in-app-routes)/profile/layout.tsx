"use client";
import { FollowingContextProvider, LazyFollowingModal } from "Layouts/Profile";
import { OptionalChildren } from "Types/React";

export default function ProfileLayout({ children }: OptionalChildren) {
  return (
    <FollowingContextProvider>
      {children}
      <LazyFollowingModal />
    </FollowingContextProvider>
  );
}
