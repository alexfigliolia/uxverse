"use client";
import { useClassNames } from "@figliolia/classnames";
import { Callback } from "Types/Generics";
import { IMediaPreview, PreviewItem } from "./PreviewItem";
import "./styles.scss";

export const PreviewMedia = ({ media, remove, onMediaLoaded }: Props) => {
  const classes = useClassNames("preview-media", { populated: !!media.length });
  return (
    <div className={classes}>
      <ul>
        {media.map((item, i) => (
          <li key={item.name}>
            <PreviewItem
              index={i}
              {...item}
              remove={remove}
              onMediaLoaded={onMediaLoaded}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  media: IMediaPreview[];
  remove: Callback<[number]>;
  onMediaLoaded: Callback;
}
