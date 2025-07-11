"use client";
import { createContext, useCallback, useMemo, useState } from "react";
import { WithContextProvider } from "Tools/WithContextProvider";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const ReplyContext = createContext<IReplyContext>({
  commentId: null,
  commenting: false,
  createComment: () => {},
  cancelComment: () => {},
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

  const value = useMemo(
    () => ({ commenting, commentId, createComment, cancelComment }),
    [commenting, commentId, createComment, cancelComment],
  );

  return <ReplyContext value={value}>{children}</ReplyContext>;
};

export const withReplyProvider = WithContextProvider(ReplyProvider);

interface IReplyContext {
  commenting: boolean;
  commentId: number | null;
  cancelComment: Callback;
  createComment: Callback<[number | null]>;
}
