"use client";
import { createModalContext } from "Tools/CreateModalContext";
import { WithContextProvider } from "Tools/WithContextProvider";

export const [CommentsWindowContext, CommentsWindowProvider] =
  createModalContext();

export const withCommentsWindowContext = WithContextProvider(
  CommentsWindowProvider,
);
