"use client";
import {
  HTMLProps,
  RefObject,
  use,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { ReplyContext } from "Components/Comments";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { EditorTaskRegister, RichTextEditor } from "Components/RichTextEditor";
import { useMergedRefs } from "Hooks/useMergedRefs";
import { useScrollHeight } from "Hooks/useScrollHeight";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const CommentEditor = ({
  ref,
  clear,
  onHeight,
  className,
  ...rest
}: Props) => {
  const [node] = useScrollHeight(0, onHeight);
  const { toggle, commenting } = use(ReplyContext);
  const registerTask = useRef<EditorTaskRegister>(null);

  const mergedRefs = useMergedRefs(node, ref, toggle.registerTrapNode);

  const clearEditor = useCallback(() => {
    registerTask.current?.(editor => editor.commands.clearContent(true));
  }, []);

  useImperativeHandle(clear, () => clearEditor, [clearEditor]);

  const cancel = useCallback(() => {
    toggle.close();
    clearEditor();
  }, [toggle, clearEditor]);

  const classes = useClassNames("comment-editor", className, {
    visible: commenting,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      ref={mergedRefs}
      className={classes}
      aria-hidden={!commenting}
      aria-label="Add a comment to this post"
      {...rest}>
      <form>
        <RichTextEditor
          ref={registerTask}
          editable
          placeholder="Comment Here"
        />
        <div className="actions">
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          <GradientBorderButton text="Submit" />
        </div>
      </form>
    </div>
  );
};

interface Props extends HTMLProps<HTMLDivElement> {
  onHeight: Callback<[number]>;
  clear?: RefObject<Callback | null>;
}
