import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import { JSONContent } from "@tiptap/core";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { Controller } from "Components/RichTextEditor";
import "./styles.scss";

export const EditorContentRenderer = ({
  content,
  className,
  ...rest
}: Props) => {
  return (
    <div className={classnames("editor-content-renderer", className)} {...rest}>
      {renderToReactElement({
        extensions: Controller.DEFAULT_EXTENSIONS,
        content,
      })}
    </div>
  );
};

interface Props extends Omit<HTMLProps<HTMLDivElement>, "content"> {
  content: JSONContent;
}
