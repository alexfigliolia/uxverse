import { use } from "react";
import { CloserButton } from "Components/CloserButton";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import { AvatarUploader } from "../AvatarUploader";
import { EditProfileContext } from "./Context";
import { EditProfileForm } from "./Form";
import "./styles.scss";

export const EditProfile = (_: Propless) => {
  const { open, toggle } = use(EditProfileContext);

  const nodeCache = createTrapNodeCache(toggle);

  return (
    <AboveNavigationBottomSheet
      className="edit-profile"
      open={open}
      ref={nodeCache}
      close={toggle.close}>
      <CloserButton onClick={toggle.close} />
      <div className="edit-profile__heading">
        <div className="edit-profile__avatar">
          <AvatarUploader />
        </div>
        <ReducedLetterSpacing Tag="h2">Edit Your Profile</ReducedLetterSpacing>
      </div>
      <div className="edit-profile__inputs">
        <EditProfileForm />
      </div>
    </AboveNavigationBottomSheet>
  );
};

export * from "./Context";
