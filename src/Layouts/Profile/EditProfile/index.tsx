import { ChangeEvent, use, useCallback, useState } from "react";
import { Input } from "Components/Input";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { AtIcon } from "Icons/At";
import { FacebookColored, FacebookFilled } from "Icons/Facebook";
import { InstagramColored, InstagramStroked } from "Icons/Instagram";
import { TiktokColored, TiktokStroked } from "Icons/Tiktok";
import { UserFilled, UserStroked } from "Icons/User";
import { YoutubeColored, YoutubeFilled } from "Icons/Youtube";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { Propless } from "Types/React";
import { ProfileBioEditor } from "../ProfileBioEditor";
import { EditProfileContext } from "./Context";
import "./styles.scss";

export const EditProfile = (_: Propless) => {
  const { open, toggle } = use(EditProfileContext);
  const [name, setName] = useState("Erica Figliolia");
  const [handle, setHandle] = useState("ericafigliolia");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "handle") {
      setHandle(value);
    }
  }, []);

  return (
    <AboveNavigationBottomSheet
      className="edit-profile"
      open={open}
      close={toggle.close}>
      <form>
        <fieldset>
          <ReducedLetterSpacing Tag="legend">Your Info</ReducedLetterSpacing>
          <Input
            type="text"
            name="name"
            value={name}
            spellCheck={false}
            placeholder="Your Name"
            IconFilled={UserFilled}
            IconStroked={UserStroked}
            onChange={onChange}
          />
          <Input
            type="text"
            name="handle"
            value={handle}
            spellCheck={false}
            className="handle"
            placeholder="Handle"
            IconFilled={AtIcon}
            IconStroked={AtIcon}
            onChange={onChange}
          />
          <ProfileBioEditor />
        </fieldset>
        <fieldset>
          <ReducedLetterSpacing Tag="legend">
            Your Social Links
          </ReducedLetterSpacing>
          <Input
            type="url"
            name="instagram"
            spellCheck={false}
            className="instagram"
            placeholder="Instagram Profile URL"
            IconFilled={InstagramColored}
            IconStroked={InstagramStroked}
          />
          <Input
            type="url"
            name="tiktok"
            spellCheck={false}
            className="tiktok"
            placeholder="Tiktok Profile URL"
            IconFilled={TiktokColored}
            IconStroked={TiktokStroked}
          />
          <Input
            type="url"
            name="facebook"
            spellCheck={false}
            className="facebook"
            placeholder="Facebook Profile URL"
            IconFilled={FacebookColored}
            IconStroked={FacebookFilled}
          />
          <Input
            type="url"
            name="youtube"
            spellCheck={false}
            className="youtube"
            placeholder="Youtube Channel URL"
            IconFilled={YoutubeColored}
            IconStroked={YoutubeFilled}
          />
        </fieldset>
        <div className="form-actions">
          <button>Save</button>
        </div>
      </form>
    </AboveNavigationBottomSheet>
  );
};

export * from "./Context";
