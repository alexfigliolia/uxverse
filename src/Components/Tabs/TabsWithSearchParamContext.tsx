"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { Suspended } from "HOCs/Suspended";
import { useMutateSearchParams } from "Hooks/useMutateSearchParams";
import { useSearchParam } from "Hooks/useSearchParam";
import { OptionalChildren } from "Types/React";
import { Tab, TabsContextProvider, TabSetter } from "./TabsContext";

export const TabsWithSearchParamContextProvider = Suspended(
  Provider,
) as typeof Provider;

function Provider<T extends Tab>({ children, options, paramKey }: Props<T>) {
  const params = useSearchParams();
  const { appendParamAndPush, appendParamAndReplace } = useMutateSearchParams();
  const setActiveTab = useRef<TabSetter<T>>(null);

  const onSearchParamSet = useCallback((value: string | null) => {
    if (value && setActiveTab.current) {
      setActiveTab.current(value);
    }
  }, []);

  useSearchParam(paramKey, onSearchParamSet);

  const onChange = useCallback(
    (tabValue: string) => {
      if (tabValue) {
        if (!params.get(paramKey)) {
          return appendParamAndReplace(paramKey, tabValue);
        }
        appendParamAndPush(paramKey, tabValue);
      }
    },
    [params, appendParamAndPush, appendParamAndReplace, paramKey],
  );

  return (
    <TabsContextProvider
      options={options}
      ref={setActiveTab}
      onChange={onChange}
      defaultTab={params.get(paramKey) || undefined}>
      {children}
    </TabsContextProvider>
  );
}

interface Props<T extends Tab> extends OptionalChildren {
  options: T[];
  paramKey: string;
}
