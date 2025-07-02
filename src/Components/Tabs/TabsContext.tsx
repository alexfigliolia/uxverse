"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const TabsContext = createContext<ITabsContext>({
  options: [],
  panelID: "-1",
  activeTab: "-1",
  ariaLabel: "",
  toTabID: () => "",
  setActiveTab: () => {},
});

export const TabsContextProvider = <T extends Tab>({
  children,
  options,
}: Props<T>) => {
  const panelID = useId();
  const [activeTab, setActiveTab] = useState<
    ExtractValues<Props<T>["options"]>
  >(options[0]?.value ?? "");

  const ariaLabel = useMemo(
    () => options.find(v => v.value === activeTab)?.label ?? "",
    [activeTab, options],
  );

  const toTabID = useCallback((value: ExtractValues<Props<T>["options"]>) => {
    return `TAB_CONTEXT_ID_${value}`;
  }, []);

  const value = useMemo(
    () => ({ toTabID, options, panelID, setActiveTab, activeTab, ariaLabel }),
    [panelID, activeTab, ariaLabel, options, toTabID],
  );

  return <TabsContext value={value}>{children}</TabsContext>;
};

interface Props<T extends Tab> extends OptionalChildren {
  options: T[];
}

export interface Tab {
  value: string;
  label: string;
}

type ExtractValues<T extends Tab[]> = {
  [K in keyof T]: T[K]["value"];
}[number];

export interface ITabsContext<T extends Tab = Tab> {
  options: T[];
  panelID: string;
  activeTab: string;
  ariaLabel: string;
  toTabID: Callback<[string], string>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}
