import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { Controller } from "Components/RichTextEditor";
import { Propless } from "Types/React";
import "./styles.scss";

export const EditorContentRenderer = (_: Propless) => {
  return (
    <div className="editor-content-renderer">
      {renderToReactElement({
        extensions: Controller.DEFAULT_EXTENSIONS,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This is a bio about things and stuff with a bio about things and stuff. ",
                },
              ],
            },
            {
              type: "paragraph",
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Behind The Matches",
                },
              ],
            },
          ],
        },
      })}
    </div>
  );
};
