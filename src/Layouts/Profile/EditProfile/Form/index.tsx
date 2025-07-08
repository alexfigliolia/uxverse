"use client";
import { ChangeEvent, use, useCallback, useRef, useState } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Input } from "Components/Input";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { EditorTaskRegister } from "Components/RichTextEditor";
import { SocialMediaHandleInput } from "Components/SocialMediaHandleInput";
import { AtIcon } from "Icons/At";
import { FacebookColored, FacebookFilled } from "Icons/Facebook";
import { InstagramColored, InstagramStroked } from "Icons/Instagram";
import { TiktokColored, TiktokStroked } from "Icons/Tiktok";
import { UserFilled, UserStroked } from "Icons/User";
import { YoutubeIcon } from "Icons/Youtube";
import { ProfileBioEditor } from "Layouts/Profile/ProfileBioEditor";
import { InputPatterns } from "Tools/InputPatterns";
import { Propless } from "Types/React";
import { EditProfileContext } from "../Context";
import "./styles.scss";

export const EditProfileForm = (_: Propless) => {
  const form = useRef<HTMLFormElement>(null);
  const { toggle } = use(EditProfileContext);
  const [name, setName] = useState("Erica Figliolia");
  const [handle, setHandle] = useState("ericafigliolia");
  const taskRegister = useRef<EditorTaskRegister | null>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "full-name") {
      setName(value);
    } else if (name === "handle") {
      setHandle(value);
    }
  }, []);

  const clearAndClose = useCallback(() => {
    toggle.close();
    form.current?.reset?.();
    setName("Erica Figliolia");
    setHandle("ericafigliolia");
    taskRegister.current?.(editor => editor.commands.clearContent());
  }, [toggle]);

  return (
    <form ref={form} className="edit-profile-form">
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
        <ProfileBioEditor ref={taskRegister} />
      </fieldset>
      <fieldset>
        <ReducedLetterSpacing Tag="legend">Social Links</ReducedLetterSpacing>
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
          IconFilled={YoutubeIcon}
          IconStroked={YoutubeIcon}
          pattern={InputPatterns.youtubeHandle}
        />
      </fieldset>
      <div className="form-actions">
        <div>
          <button
            type="button"
            className="cancel-profile-update"
            onClick={clearAndClose}>
            <ReducedLetterSpacing Tag="span">Cancel</ReducedLetterSpacing>
          </button>
          <GradientBorderButton text="Save" />
        </div>
      </div>
    </form>
  );
};
