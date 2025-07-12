"use client";
import { createContext, useCallback, useMemo, useState } from "react";
import { ModalToggle, useModalToggle } from "@figliolia/modal-stack";
import { WithContextProvider } from "Tools/WithContextProvider";
import { OptionalChildren } from "Types/React";

export const ReplyContext = createContext<IReplyContext>({
  commentId: null,
  commenting: false,
  toggle: new ModalToggle(
    (_: number | null) => {},
    () => {},
  ),
});

export const ReplyProvider = ({ children }: OptionalChildren) => {
  const [commenting, setCommenting] = useState(false);
  const [commentId, setCommentId] = useState<number | null>(null);

  const cancelComment = useCallback(() => {
    setCommentId(null);
    setCommenting(false);
  }, []);

  const createComment = useCallback((ID: null | number) => {
    setCommentId(ID);
    setCommenting(true);
  }, []);

  const toggle = useModalToggle(createComment, cancelComment);

  const value = useMemo(
    () => ({ commenting, commentId, toggle }),
    [commenting, commentId, toggle],
  );

  return <ReplyContext value={value}>{children}</ReplyContext>;
};

export const withReplyProvider = WithContextProvider(ReplyProvider);

interface IReplyContext {
  commenting: boolean;
  commentId: number | null;
  toggle: ModalToggle<[ID: number | null]>;
}
