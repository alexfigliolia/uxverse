import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useAppendSearchParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const mutateAndNavigate = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const nextParams = new URLSearchParams(params);
      mutator(nextParams);
      const paramString = nextParams.toString();
      const queryParam = paramString.length ? `?${paramString}` : "";
      router.push(`${pathname}${queryParam}`, { scroll: false });
    },
    [params, router, pathname],
  );

  const appendParam = useCallback(
    (key: string, value: string) => {
      mutateAndNavigate(params => {
        params.set(key, value);
      });
    },
    [mutateAndNavigate],
  );

  const deleteParam = useCallback(
    (key: string) => {
      mutateAndNavigate(params => {
        params.delete(key);
      });
    },
    [mutateAndNavigate],
  );

  return useMemo(
    () => ({ appendParam, deleteParam }),
    [appendParam, deleteParam],
  );
};
