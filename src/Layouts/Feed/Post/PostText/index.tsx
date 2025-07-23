"use client";
import { useCallback } from "react";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { ExpandableText } from "Components/ExpandableText";
import { Scrolling } from "Tools/Scrolling";
import { Propless } from "Types/React";
import "./styles.scss";

export const PostText = (_: Propless) => {
  const onCollapse = useCallback((node: HTMLDivElement | null) => {
    Scrolling.scrollWindowToNode(node?.closest?.(".post"), 100);
  }, []);

  return (
    <ExpandableText onCollapse={onCollapse}>
      <EditorContentRenderer
        content={{
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Erica Figliolia ",
                },
                {
                  type: "text",
                  text: "Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things.",
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
                  text: "Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things.",
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
                  text: "Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things. Blah blah blah about stuff and things. Post about stuff and things Blah blah blah about stuff and things.",
                },
              ],
            },
          ],
        }}
      />
    </ExpandableText>
  );
};
