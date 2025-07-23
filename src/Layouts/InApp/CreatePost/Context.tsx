import { createContext, createRef, RefObject, useMemo, useRef } from "react";
import { ModalToggle } from "@figliolia/modal-stack";
import { useBasicModalToggle } from "Hooks/useBasicModalToggle";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const CreatePostContext = createContext<ICreatePostContext>({
  open: false,
  toggle: new ModalToggle(
    () => {},
    () => {},
  ),
  setPlace: createRef<SetPlaceFN>(),
});

export const CreatePostProvider = ({ children }: OptionalChildren) => {
  const { open, toggle } = useBasicModalToggle();
  const setPlace = useRef<SetPlaceFN>(null);

  const value = useMemo(() => ({ open, toggle, setPlace }), [open, toggle]);

  return <CreatePostContext value={value}>{children}</CreatePostContext>;
};

export interface ICreatePostContext {
  open: boolean;
  toggle: ModalToggle;
  setPlace: RefObject<SetPlaceFN | null>;
}

export type SetPlaceFN = Callback<[string, string]>;
