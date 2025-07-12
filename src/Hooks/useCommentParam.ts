import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Callback } from "Types/Generics";

export const useCommentParam = (onComments: Callback) => {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("comments")) {
      return onComments();
    }
  }, [params, onComments]);
};
