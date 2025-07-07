import { useCallback, useEffect, useRef, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { EditorTaskRegister, RichTextEditor } from "Components/RichTextEditor";
import "./styles.scss";

export const ProfileBioEditor = ({ initialContent }: Props) => {
  const [empty, setEmpty] = useState(!initialContent);
  const taskRegister = useRef<EditorTaskRegister>(null);

  const checkIfEmpty = useCallback(() => {
    taskRegister.current?.(editor => {
      setEmpty(editor.isEmpty);
    });
  }, []);

  useEffect(() => {
    const { current: register } = taskRegister;
    register?.(editor => {
      editor.on("update", checkIfEmpty);
    });
    return () => {
      register?.(editor => {
        editor.on("update", checkIfEmpty);
      });
    };
  }, [checkIfEmpty]);

  return (
    <RichTextEditor
      editable
      ref={taskRegister}
      className="profile-bio-editor"
      initialContent={initialContent}>
      {empty && <span className="input-placeholder">Your Bio Here</span>}
    </RichTextEditor>
  );
};

interface Props {
  initialContent?: JSONContent;
}
