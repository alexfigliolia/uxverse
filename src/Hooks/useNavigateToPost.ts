import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useNavigateToPost = (
  id: number,
  comment: number | boolean = false,
) => {
  const router = useRouter();

  const queryParam = useMemo(() => {
    if (comment === false) {
      return "";
    }
    if (comment === true) {
      return `?comments=1`;
    }
    return `?comment=${comment}`;
  }, [comment]);

  return useCallback(() => {
    router.push(`/feed/${id}${queryParam}`);
  }, [id, router, queryParam]);
};
