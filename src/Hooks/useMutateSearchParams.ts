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

  const mutateAndReplace = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const nextPath = mutate(mutator);
      router.replace(nextPath, { scroll: false });
    },
    [mutate, router],
  );

  const appendParamAndPush = useCallback(
    (key: string, value: string) => {
      mutateAndNavigate(params => {
        params.set(key, value);
      });
    },
    [mutateAndNavigate],
  );

  const appendParamAndReplace = useCallback(
    (key: string, value: string) => {
      mutateAndReplace(params => {
        params.set(key, value);
      });
    },
    [mutateAndReplace],
  );

  const deleteParamAndPush = useCallback(
    (key: string) => {
      mutateAndNavigate(params => {
        params.delete(key);
      });
    },
    [mutateAndNavigate],
  );

  const deleteParamAndReplace = useCallback(
    (key: string) => {
      mutateAndReplace(params => {
        params.delete(key);
      });
    },
    [mutateAndReplace],
  );

  return useMemo(
    () => ({
      appendParamAndPush,
      appendParamAndReplace,
      deleteParamAndPush,
      deleteParamAndReplace,
    }),
    [
      appendParamAndPush,
      appendParamAndReplace,
      deleteParamAndPush,
      deleteParamAndReplace,
    ],
  );
};
