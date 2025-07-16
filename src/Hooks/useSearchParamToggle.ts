import { useCallback, useMemo, useState } from "react";
import { useModalToggle } from "@figliolia/modal-stack";
import { useMutateSearchParams } from "./useMutateSearchParams";
import { useSearchParam } from "./useSearchParam";

export const useSearchParamToggle = (param: string) => {
  const [open, setOpen] = useState(false);
  const { deleteParam } = useMutateSearchParams();

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    deleteParam(param);
  }, [deleteParam, param]);

  const toggle = useModalToggle(openModal, closeModal);

  const onSearchParam = useCallback(
    (value: string | null) => {
      if (value) {
        toggle.open();
      } else {
        toggle.close();
      }
    },
    [toggle],
  );

  useSearchParam(param, onSearchParam);

  return useMemo(() => ({ toggle, open }), [toggle, open]);
};
