import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useNavigateToPost = (id: number) => {
  const router = useRouter();
  return useCallback(() => {
    router.push(`/feed/${id}`);
  }, [id, router]);
};
