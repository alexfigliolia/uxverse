"use client";
import {
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import {
  EditorContent,
  Extensions,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { OptionalChildren } from "Types/React";
import { Controller, EditorTaskRegister } from "./Controller";
import "./styles.scss";

export const RichTextEditor = ({
  ref,
  editable,
  className,
  children,
  placeholder,
  extensions = [],
  initialContent,
}: Props) => {
  const [empty, setEmpty] = useState(!initialContent);
  const controller = useController(new Controller());

  const mergedExtensions = useMemo(
    () => [...extensions, ...Controller.DEFAULT_EXTENSIONS],
    [extensions],
  );

  const editor = useEditor({
    editable,
    immediatelyRender: false,
    extensions: mergedExtensions,
    content: initialContent,
  });

  useEffect(() => {
    controller.registerInstance(editor);
  }, [editor, controller]);

  const checkIfEmpty = useCallback(() => {
    controller.registerTask(editor => {
      setEmpty(editor.isEmpty);
    });
  }, [controller]);

  useEffect(() => {
    controller.registerTask(editor => {
      editor.on("update", checkIfEmpty);
    });
    return () => {
      controller.registerTask(editor => {
        editor.off("update", checkIfEmpty);
      });
    };
  }, [controller, checkIfEmpty]);

  useImperativeHandle(ref, () => controller.registerTask, [controller]);

  const classes = useClassNames("rich-text-editor", className);

  return (
    <EditorContent className={classes} editor={editor}>
      {editable && empty && placeholder && (
        <span className="input-placeholder">{placeholder}</span>
      )}
      {children}
    </EditorContent>
  );
};

interface Props extends OptionalChildren {
  editable?: boolean;
  className?: string;
  placeholder?: string;
  extensions?: Extensions;
  initialContent?: JSONContent;
  ref?: RefObject<EditorTaskRegister | null>;
}

export * from "./Controller";
