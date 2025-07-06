"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useTimeout } from "@figliolia/react-hooks";
import { CloserButton } from "Components/CloserButton";
import { FullBleedImage } from "Components/FullBleedImage";
import { FullBleedVideo } from "Components/FullBleedVideo";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const PreviewItem = ({ src, name, type, remove }: Props) => {
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

  const onClick = useCallback(() => {
    setRender(false);
    timeout.execute(() => remove(), 600);
  }, [timeout, remove]);

  const classes = useClassNames("preview-item", { render });

  const typeName = useMemo(
    () => (type.startsWith("image") ? "Image" : "Video"),
    [type],
  );

  return (
    <figure
      ref={node}
      className={classes}
      style={{ "--max-height": `${maxHeight}px` }}>
      {type.startsWith("image") && <FullBleedImage src={src} alt={name} />}
      {type.startsWith("video") && (
        <FullBleedVideo src={src} alt={name} controls />
      )}
      <CloserButton onClick={onClick} aria-label={`Delete this ${typeName}`} />
    </figure>
  );
};

interface Props extends IMediaPreview {
  remove: Callback;
}

export interface IMediaPreview {
  src: string;
  type: string;
  name: string;
}
