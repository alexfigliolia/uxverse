"use client";
import {
  ChangeEvent,
  FormEvent,
  use,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { CaptureTheMoment } from "Components/CaptureTheMoment";
import { InAppBottomSheet } from "Components/InAppBottomSheet";
import { createTrapNodeCache } from "Tools/CreateModalContext";
import { Propless } from "Types/React";
import { CreatePostContext } from "./Context";
import { Header } from "./Header";
import { PostInput, TextArea } from "./PostInput";
import { PreviewMedia } from "./PreviewMedia";
import { IMediaPreview } from "./PreviewMedia/PreviewItem";
import "./styles.scss";

export const CreatePost = (_: Propless) => {
  const { toggle, open } = use(CreatePostContext);
  const fileUploader = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState("");
  const [_files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<IMediaPreview[]>([]);

  const trapCache = useMemo(() => createTrapNodeCache(toggle), [toggle]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;
      if (name === "place") {
        return setPlace(value);
      }
    },
    [],
  );

  const onFileUpload = useCallback(() => {
    if (!fileUploader.current) {
      return;
    }
    const { files } = fileUploader.current;
    if (!files?.length) {
      return;
    }
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
    <InAppBottomSheet
      dim
      notch
      open={open}
      ref={trapCache}
      close={toggle.close}
      className="create-post">
      <Header />
      <div className="create-post__form">
        <form onSubmit={onSubmit}>
          <TextArea
            name="story"
            className="story"
            placeholder="Tell your story"
          />
          <CaptureTheMoment ref={fileUploader} onChange={onFileUpload} />
          <PreviewMedia media={previews} remove={removeUploadedItem} />
          <PostInput className="venue">
            <input
              type="text"
              name="place"
              placeholder="Place or Venue (optional)"
              onChange={onChange}
            />
          </PostInput>
          {(place || true) && (
            <PostInput>
              <input
                type="text"
                name="rating"
                placeholder="How would you rate your experience?"
                onChange={onChange}
              />
            </PostInput>
          )}
        </form>
      </div>
    </InAppBottomSheet>
  );
};

export * from "./Context";
