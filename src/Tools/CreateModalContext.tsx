"use client";
import { createContext } from "react";
import { ISheetController } from "@figliolia/bottom-sheet";
import { ModalToggle } from "@figliolia/modal-stack";
import { useToggle } from "Hooks/useToggle";
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
    const value = useToggle();
    return <Context value={value}>{children}</Context>;
  };

  return [Context, Provider] as const;
};

export const createTrapNodeCache =
  (toggle: ModalToggle<any>) => (sheet: ISheetController) => {
    toggle.registerTrapNode(sheet?.scrollView?.current ?? null);
  };
