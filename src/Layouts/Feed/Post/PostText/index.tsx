"use client";
import { useCallback, useRef, useState } from "react";
import { classnames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import { OverscrollDetector } from "Components/OverscrollDetector";
import { Scrolling } from "Tools/Scrolling";
import { Propless } from "Types/React";
import "./styles.scss";

export const PostText = (_: Propless) => {
  const timeout = useTimeout();
  const node = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState(false);
  const [disableTruncation, setDisableTruncation] = useState(false);

  const onClick = useCallback(() => {
    if (!window.getSelection()?.toString?.()?.length) {
      setExpand(e => {
        if (e) {
          Scrolling.scrollWindowToNode(node.current?.closest?.(".post"), 100);
          timeout.execute(() => setDisableTruncation(false), 500);
        } else {
          setDisableTruncation(true);
        }
        return !e;
      });
    }
  }, [timeout]);

  return (
    <OverscrollDetector ref={node}>
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
            "disable-truncation": isTruncated && disableTruncation,
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
