import { use } from "react";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import { FollowingContext } from "../FollowingContext";
import { TabList } from "./TabList";
import "./styles.scss";

export const FollowingModal = (_: Propless) => {
  const { toggle, visible } = use(FollowingContext);
  const nodeCache = createTrapNodeCache(toggle);
  return (
    <AboveNavigationBottomSheet
      open={visible}
      ref={nodeCache}
      className="following-sheet"
      close={toggle.close}>
      <TabList />
    </AboveNavigationBottomSheet>
  );
};
