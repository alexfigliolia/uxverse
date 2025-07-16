import { RefObject } from "react";
import { EditorContentRenderer } from "Components/EditorContentRenderer";
import "./styles.scss";

export const ProfileBioRenderer = ({ ref }: Props) => {
  return (
    <EditorContentRenderer
      ref={ref}
      content={{
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
      }}
    />
  );
};

interface Props {
  ref?: RefObject<HTMLDivElement | null>;
}
