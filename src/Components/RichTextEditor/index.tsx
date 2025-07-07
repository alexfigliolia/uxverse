"use client";
import { RefObject, useEffect, useImperativeHandle, useMemo } from "react";
import { useController } from "@figliolia/react-hooks";
import Document from "@tiptap/extension-document";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  EditorContent,
  Extensions,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { OptionalChildren } from "Types/React";
import { Controller, EditorTaskRegister } from "./Controller";

export const RichTextEditor = ({
  ref,
  editable,
  className,
  children,
  extensions = [],
  initialContent,
}: Props) => {
  const controller = useController(new Controller());

  const mergedExtensions = useMemo(
    () => [
      ...extensions,
      Text,
      Paragraph,
      Document,
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],
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

  useImperativeHandle(ref, () => controller.registerTask, [controller]);

  return (
    <EditorContent className={className} editor={editor}>
      {children}
    </EditorContent>
  );
};

interface Props extends OptionalChildren {
  editable?: boolean;
  className?: string;
  extensions?: Extensions;
  initialContent?: JSONContent;
  ref?: RefObject<EditorTaskRegister | null>;
}

export * from "./Controller";
