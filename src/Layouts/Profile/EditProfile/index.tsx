import { use } from "react";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { Propless } from "Types/React";
import { EditProfileContext } from "./Context";

export const EditProfile = (_: Propless) => {
  const { open, toggle } = use(EditProfileContext);
  return (
    <AboveNavigationBottomSheet
      className="edit-profile"
      open={open}
      close={toggle.close}>
      <form>
        <label>
          <input type="text" name="name" />
        </label>
        <label>
          <input type="text" name="handle" />
        </label>
        <label>
          <textarea name="bio"></textarea>
        </label>
        <button>Save</button>
      </form>
    </AboveNavigationBottomSheet>
  );
};

export * from "./Context";
