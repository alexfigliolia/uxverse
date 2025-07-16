import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useMutateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const mutate = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const nextParams = new URLSearchParams(params);
      mutator(nextParams);
      const paramString = nextParams.toString();
      const queryParam = paramString.length ? `?${paramString}` : "";
      return `${pathname}${queryParam}`;
    },
    [params, pathname],
  );

  const mutateAndNavigate = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const nextPath = mutate(mutator);
      router.push(nextPath, { scroll: false });
    },
    [mutate, router],
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
