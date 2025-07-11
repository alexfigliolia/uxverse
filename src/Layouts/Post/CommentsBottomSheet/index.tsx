"use client";
import { use, useCallback, useRef, useState } from "react";
import { CloserButton } from "Components/CloserButton";
import {
  CommentsWindowContext,
  ReplyContext,
  withReplyProvider,
} from "Components/Comments";
import { AboveNavigationBottomSheet } from "Layouts/InApp";
import { Callback } from "Types/Generics";
import { Propless } from "Types/React";
import { CommentEditor } from "../CommentEditor";
import { CommentsTree } from "../CommentsTree";
import "./styles.scss";

export const CommentsBottomSheet = withReplyProvider((_: Propless) => {
  const clearEditor = useRef<Callback | null>(null);
  const { cancelComment } = use(ReplyContext);
  const { open, toggle } = use(CommentsWindowContext);
  const [paddingBottom, setPaddingBottom] = useState(150);

  const close = useCallback(() => {
    toggle.close();
    cancelComment();
    clearEditor?.current?.();
  }, [toggle, cancelComment]);

  return (
    <AboveNavigationBottomSheet
      open={open}
      close={close}
      className="comments-bottom-sheet">
      <CloserButton onClick={close} />
      <CommentsTree style={{ paddingBottom }} />
      <CommentEditor clear={clearEditor} onHeight={setPaddingBottom} />
    </AboveNavigationBottomSheet>
  );
});
