import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Callback } from "Types/Generics";

export const useSearchParam = (
  key: string,
  callback: Callback<[string | null]>,
) => {
  const params = useSearchParams();
  const value = params.get(key);

  useEffect(() => {
    callback(value);
  }, [value, callback]);
};
