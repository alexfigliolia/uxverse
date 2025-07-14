"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { CloserButton } from "Components/CloserButton";
import { FullBleedImage } from "Components/FullBleedImage";
import { FullBleedVideo } from "Components/FullBleedVideo";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const PreviewItem = ({
  src,
  name,
  type,
  index,
  remove,
  onMediaLoaded,
}: Props) => {
  const timeout = useTimeout();
  const node = useRef<HTMLElement>(null);
  const [render, setRender] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    setMaxHeight(node.current.scrollWidth);
    setRender(true);
  }, []);

  const deleteItem = useCallback(() => {
    remove(index);
  }, [remove, index]);

  const onClick = useCallback(() => {
    setRender(false);
    timeout.execute(() => deleteItem(), 600);
  }, [timeout, deleteItem]);

  const typeName = useMemo(
    () => (type.startsWith("image") ? "Image" : "Video"),
    [type],
  );

  const classes = useClassNames("preview-item", { render });

  return (
    <figure
      ref={node}
      className={classes}
      style={{ "--max-height": `${maxHeight}px` }}>
      {type.startsWith("image") && (
        <FullBleedImage src={src} alt={name} onLoad={onMediaLoaded} />
      )}
      {type.startsWith("video") && (
        <FullBleedVideo
          src={src}
          alt={name}
          controls
          onLoadedData={onMediaLoaded}
        />
      )}
      <CloserButton onClick={onClick} aria-label={`Delete this ${typeName}`} />
    </figure>
  );
};

interface Props extends IMediaPreview {
  index: number;
  onMediaLoaded: Callback;
  remove: Callback<[number]>;
}

export interface IMediaPreview {
  src: string;
  type: string;
  name: string;
}
