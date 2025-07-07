import { ChangeEvent, use, useCallback, useState } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Input } from "Components/Input";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { SocialMediaHandleInput } from "Components/SocialMediaHandleInput";
import { AtIcon } from "Icons/At";
import { FacebookColored, FacebookFilled } from "Icons/Facebook";
import { InstagramColored, InstagramStroked } from "Icons/Instagram";
import { TiktokColored, TiktokStroked } from "Icons/Tiktok";
import { UserFilled, UserStroked } from "Icons/User";
import { YoutubeColored, YoutubeFilled } from "Icons/Youtube";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { InputPatterns } from "Tools/InputPatterns";
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
    if (name === "full-name") {
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
            feedback
            required
            type="text"
            name="full-name"
            value={name}
            spellCheck={false}
            placeholder="Your Name"
            IconFilled={UserFilled}
            IconStroked={UserStroked}
            onChange={onChange}
            pattern={InputPatterns.fullName}
          />
          <Input
            feedback
            required
            type="text"
            name="handle"
            value={handle}
            spellCheck={false}
            className="handle"
            placeholder="Handle"
            IconFilled={AtIcon}
            IconStroked={AtIcon}
            onChange={onChange}
            pattern={InputPatterns.visitorHandle}
          />
          <ProfileBioEditor />
        </fieldset>
        <fieldset>
          <ReducedLetterSpacing Tag="legend">
            Your Social Links
          </ReducedLetterSpacing>
          <SocialMediaHandleInput
            feedback
            name="instagram"
            className="instagram"
            placeholder="Instagram Handle"
            IconFilled={InstagramColored}
            IconStroked={InstagramStroked}
            pattern={InputPatterns.instagramHandle}
          />
          <SocialMediaHandleInput
            feedback
            name="tiktok"
            className="tiktok"
            placeholder="Tiktok Handle"
            IconFilled={TiktokColored}
            IconStroked={TiktokStroked}
            pattern={InputPatterns.tiktokHandle}
          />
          <Input
            feedback
            type="url"
            name="facebook"
            spellCheck={false}
            className="facebook"
            placeholder="Facebook Profile URL"
            IconFilled={FacebookColored}
            IconStroked={FacebookFilled}
            pattern={InputPatterns.tiktokHandle}
          />
          <SocialMediaHandleInput
            feedback
            name="youtube"
            className="youtube"
            placeholder="Youtube Handle"
            IconFilled={YoutubeColored}
            IconStroked={YoutubeFilled}
            pattern={InputPatterns.youtubeHandle}
          />
        </fieldset>
        <div className="form-actions">
          <GradientBorderButton text="Save" />
        </div>
      </form>
    </AboveNavigationBottomSheet>
  );
};

export * from "./Context";
