import { RefObject } from "react";
import { JSONContent } from "@tiptap/react";
import { EditorTaskRegister, RichTextEditor } from "Components/RichTextEditor";
import "./styles.scss";

export const ProfileBioEditor = ({ ref, initialContent }: Props) => {
  return (
    <RichTextEditor
      editable
      ref={ref}
      placeholder="Your Bio Here"
      className="profile-bio-editor"
      initialContent={initialContent}
    />
  );
};

interface Props {
  initialContent?: JSONContent;
  ref?: RefObject<EditorTaskRegister | null>;
}
