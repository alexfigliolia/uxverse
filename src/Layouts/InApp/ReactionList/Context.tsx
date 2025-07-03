"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ModalToggle, useModalToggle } from "@figliolia/modal-stack";
import { OptionalChildren } from "Types/React";

export const ReactionListContext = createContext<IReactionListContext>({
  open: false,
  reactions: [],
  setReactions: () => {},
  toggle: new ModalToggle(
    () => {},
    () => {},
  ),
});

export const ReactionListProvider = ({ children }: OptionalChildren) => {
  const [open, setOpen] = useState(false);
  const [reactions, setReactions] = useState<UserReaction[]>([]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useModalToggle(openModal, closeModal);

  const value = useMemo(
    () => ({ reactions, toggle, open, setReactions }),
    [toggle, open, setReactions, reactions],
  );

  return <ReactionListContext value={value}>{children}</ReactionListContext>;
};

export interface UserReaction {
  user: string;
  reaction: string;
}

export interface IReactionListContext {
  open: boolean;
  toggle: ModalToggle;
  reactions: UserReaction[];
  setReactions: Dispatch<SetStateAction<UserReaction[]>>;
}
