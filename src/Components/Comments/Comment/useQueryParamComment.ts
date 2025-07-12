import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Callback } from "Types/Generics";

let last: null | number = null;

export const useQueryParamComment = (id: number, onParam: Callback) => {
  const params = useSearchParams();

  useEffect(() => {
    return () => {
      last = null;
    };
  }, []);

  useEffect(() => {
    if (parseInt(params.get("comment") ?? "-1") === id && last !== id) {
      onParam();
      last = id;
    }
  }, [id, params, onParam]);
};
