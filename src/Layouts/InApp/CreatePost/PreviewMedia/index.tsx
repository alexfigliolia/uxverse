"use client";
import { useClassNames } from "@figliolia/classnames";
import { Callback } from "Types/Generics";
import { IMediaPreview, PreviewItem } from "./PreviewItem";
import "./styles.scss";

export const PreviewMedia = ({ media, remove }: Props) => {
  const classes = useClassNames("preview-media", { populated: !!media.length });
  return (
    <div className={classes}>
      <ul>
        {media.map((item, i) => (
          <li key={item.name}>
            <PreviewItem {...item} remove={() => remove(i)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  remove: Callback<[number]>;
  media: IMediaPreview[];
}
