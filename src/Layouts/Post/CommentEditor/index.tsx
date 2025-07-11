"use client";
import {
  RefObject,
  use,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReplyContext } from "Components/Comments";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { EditorTaskRegister, RichTextEditor } from "Components/RichTextEditor";
import { useScrollHeight } from "Hooks/useScrollHeight";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const CommentEditor = ({ onHeight, clear }: Props) => {
  const { cancelComment, commenting } = use(ReplyContext);
  const registerTask = useRef<EditorTaskRegister>(null);

  const [node] = useScrollHeight<HTMLFormElement>(onHeight);

  const clearEditor = useCallback(() => {
    registerTask.current?.(editor => editor.commands.clearContent(true));
  }, []);

  useImperativeHandle(clear, () => clearEditor, [clearEditor]);

  const cancel = useCallback(() => {
    cancelComment();
    clearEditor();
  }, [cancelComment, clearEditor]);

  const classes = useClassNames("comment-editor", { visible: commenting });

  useEffect(() => {
    if (commenting) {
      registerTask?.current?.(editor => editor.commands.focus());
    }
  }, [commenting]);

  return (
    <form ref={node} className={classes}>
      <RichTextEditor ref={registerTask} editable placeholder="Comment Here" />
      <div className="actions">
        <button type="button" onClick={cancel}>
          Cancel
        </button>
        <GradientBorderButton text="Submit" />
      </div>
    </form>
  );
};

interface Props {
  onHeight?: Callback<[number]>;
  clear?: RefObject<Callback | null>;
}
