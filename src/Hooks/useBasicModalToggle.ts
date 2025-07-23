import { useCallback, useMemo, useState } from "react";
import { useModalToggle } from "@figliolia/modal-stack";

export const useBasicModalToggle = () => {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useModalToggle(openModal, closeModal);

  return useMemo(() => ({ toggle, open }), [toggle, open]);
};
