import { useCallback, useMemo, useRef } from "react";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import { Callback } from "Types/Generics";

export const useHiddenImageUploader = (onFile: Callback<[File]>) => {
  const input = useRef<HTMLInputElement>(null);

  const onChange = useCallback(() => {
    if (input?.current?.files?.length) {
      onFile(input.current.files[0]);
    }
  }, [onFile]);

  const onEnter = useCallback(() => {
    input?.current?.click();
  }, []);

  const listener = useFocusedKeyListener(onEnter, "Enter");

  return useMemo(
    () => ({ input, onChange, listener }),
    [input, onChange, listener],
  );
};
