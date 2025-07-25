import { useCallback, useMemo, useState } from "react";
import { usePopoverToggle } from "@figliolia/modal-stack";

export const useBasicPopoverToggle = () => {
  const [open, setOpen] = useState(false);

  const openPopover = useCallback(() => {
    setOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = usePopoverToggle(openPopover, closePopover);

  return useMemo(() => ({ toggle, open }), [toggle, open]);
};
