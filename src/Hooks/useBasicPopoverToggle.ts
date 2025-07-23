import { useCallback, useMemo, useState } from "react";
import { usePopoverToggle } from "@figliolia/modal-stack";

export const useBasicPopoverToggle = () => {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = usePopoverToggle(openModal, closeModal);

  return useMemo(() => ({ toggle, open }), [toggle, open]);
};
