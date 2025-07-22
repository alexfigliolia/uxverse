"use client";
import { FormEvent, use, useCallback, useMemo, useRef, useState } from "react";
import { CaptureTheMoment } from "Components/CaptureTheMoment";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { UserAvatarWithInfo } from "Components/UserAvatarWithInfo";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import { AboveNavigationBottomSheet } from "../AboveNavigationBottomSheet";
import { CreatePostContext } from "./Context";
import { PlaceInput } from "./PlaceInput";
import { TextArea } from "./PostInput";
import { PreviewMedia } from "./PreviewMedia";
import { IMediaPreview } from "./PreviewMedia/PreviewItem";
import { RatingInput } from "./RatingInput";
import "./styles.scss";

export const CreatePost = (_: Propless) => {
  const { toggle, open } = use(CreatePostContext);
  const fileUploader = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(0);
  const [_files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<IMediaPreview[]>([]);

  const trapCache = useMemo(() => createTrapNodeCache(toggle), [toggle]);

  const onMediaLoaded = useCallback(() => {
    setLoading(l => l - 1);
  }, []);

  const onFileUpload = useCallback(() => {
    if (!fileUploader.current) {
      return;
    }
    const { files } = fileUploader.current;
    if (!files?.length) {
      return;
    }
    setLoading(files.length);
    const fileArray = Array.from(files);
    setFiles(f => [...f, ...fileArray]);
    setPreviews(p => [
      ...p,
      ...fileArray.map(f => ({
        name: f.name,
        type: f.type,
        src: URL.createObjectURL(f),
      })),
    ]);
  }, []);

  const removeUploadedItem = useCallback((index: number) => {
    setFiles(f => f.filter((_, i) => i !== index));
    setPreviews(f => f.filter((_, i) => i !== index));
  }, []);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <AboveNavigationBottomSheet
      open={open}
      ref={trapCache}
      close={toggle.close}
      className="create-post">
      <UserAvatarWithInfo>
        <GradientBorderButton text="post" />
      </UserAvatarWithInfo>
      <div className="create-post__form">
        <form onSubmit={onSubmit}>
          <TextArea
            name="story"
            className="story"
            placeholder="Tell your story"
          />
          <CaptureTheMoment
            ref={fileUploader}
            loading={!!loading}
            onChange={onFileUpload}
          />
          <PreviewMedia
            media={previews}
            remove={removeUploadedItem}
            onMediaLoaded={onMediaLoaded}
          />
          <PlaceInput selectedID={place} setSelectedID={setPlace} />
          <RatingInput selectedID={rating} setSelectedID={setRating} />
        </form>
      </div>
    </AboveNavigationBottomSheet>
  );
};

export * from "./Context";
