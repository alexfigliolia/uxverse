import {
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { JSONContent } from "@tiptap/react";
import {
  EditorTask,
  EditorTaskRegister,
  RichTextEditor,
} from "Components/RichTextEditor";
import "./styles.scss";

export const ProfileBioEditor = ({ ref, initialContent }: Props) => {
  const [empty, setEmpty] = useState(!initialContent);
  const taskRegister = useRef<EditorTaskRegister>(null);

  const checkIfEmpty = useCallback(() => {
    taskRegister.current?.(editor => {
      setEmpty(editor.isEmpty);
    });
  }, []);

  const registerTask = useCallback((task: EditorTask) => {
    taskRegister?.current?.(task);
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

  useImperativeHandle(ref, () => registerTask, [registerTask]);

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
  ref?: RefObject<EditorTaskRegister | null>;
}
