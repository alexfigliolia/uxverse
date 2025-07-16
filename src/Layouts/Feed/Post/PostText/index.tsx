"use client";
import { useCallback, useState } from "react";
import { classnames } from "@figliolia/classnames";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { OverscrollDetector } from "Components/OverscrollDetector";
import { Propless } from "Types/React";
import "./styles.scss";

export const PostText = (_: Propless) => {
  const [expand, setExpand] = useState(false);

  const onClick = useCallback(() => {
    if (!window.getSelection()?.toString?.()?.length) {
      setExpand(e => !e);
    }
  }, []);

  return (
    <OverscrollDetector>
      {({ ref, isTruncated, scrollHeight, clientHeight }) => (
        <div
          ref={ref}
          style={{
            "--client-height": `${clientHeight}px`,
            "--scroll-height": `${scrollHeight}px`,
          }}
          role={isTruncated ? "button" : undefined}
          onClick={isTruncated ? onClick : undefined}
          aria-expanded={isTruncated ? expand : undefined}
          className={classnames("post-content__text", {
            expand,
            overscroll: isTruncated,
          })}
          title={isTruncated ? "Click to expand" : undefined}>
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
        </div>
      )}
    </OverscrollDetector>
  );
};
