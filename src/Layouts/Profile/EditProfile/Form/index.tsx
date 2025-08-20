"use client";
import { ChangeEvent, use, useCallback, useRef, useState } from "react";
import { FacebookProfileURLInput } from "Components/FacebookProfileURLInput";
import { FullNameInput } from "Components/FullNameInput";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { InstagramHandleInput } from "Components/InstagramHandleInput";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { EditorTaskRegister } from "Components/RichTextEditor";
import { TiktokHandleInput } from "Components/TiktokHandleInput";
import { VisitorHandleInput } from "Components/VisitorHandleInput";
import { YoutubeHandleInput } from "Components/YoutubeHandleInput";
import { ProfileBioEditor } from "Layouts/Profile/ProfileBioEditor";
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
    taskRegister.current?.(editor => editor.commands.clearContent(true));
  }, [toggle]);

  return (
    <form ref={form} className="edit-profile-form">
      <div className="edit-profile-form__fields">
        <fieldset>
          <ReducedLetterSpacing Tag="legend">Your Info</ReducedLetterSpacing>
          <FullNameInput
            required
            value={name}
            name="full-name"
            onChange={onChange}
            placeholder="Your Name"
          />
          <VisitorHandleInput
            required
            name="handle"
            value={handle}
            onChange={onChange}
            placeholder="Handle"
          />
          <ProfileBioEditor ref={taskRegister} />
        </fieldset>
        <fieldset>
          <ReducedLetterSpacing Tag="legend">Social Links</ReducedLetterSpacing>
          <InstagramHandleInput name="instagram" />
          <TiktokHandleInput name="tiktok" />
          <FacebookProfileURLInput name="facebook" />
          <YoutubeHandleInput name="youtube" />
        </fieldset>
      </div>
      <div className="edit-profile-form__actions">
        <button
          type="button"
          className="cancel-profile-update"
          onClick={clearAndClose}>
          <ReducedLetterSpacing Tag="span">Cancel</ReducedLetterSpacing>
        </button>
        <GradientBorderButton text="Save" />
      </div>
    </form>
  );
};
