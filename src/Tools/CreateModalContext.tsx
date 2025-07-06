import { createContext, useCallback, useMemo, useState } from "react";
import { ISheetController } from "@figliolia/bottom-sheet";
import { ModalToggle, useModalToggle } from "@figliolia/modal-stack";
import { OptionalChildren } from "Types/React";

export const createModalContext = () => {
  const Context = createContext({
    open: false,
    toggle: new ModalToggle(
      () => {},
      () => {},
    ),
  });

  const Provider = ({ children }: OptionalChildren) => {
    const [open, setOpen] = useState(false);

    const openModal = useCallback(() => {
      setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
      setOpen(false);
    }, []);

    const toggle = useModalToggle(openModal, closeModal);

    const value = useMemo(() => ({ toggle, open }), [toggle, open]);
    return <Context value={value}>{children}</Context>;
  };

  return [Context, Provider] as const;
};

export const createTrapNodeCache =
  (toggle: ModalToggle<any>) => (sheet: ISheetController) => {
    toggle.registerTrapNode(sheet?.scrollView?.current ?? null);
  };
