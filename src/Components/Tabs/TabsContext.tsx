"use client";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
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
  activeTabID: "-1",
  setActiveTab: () => {},
});

export const TabsContextProvider = <T extends Tab>({
  ref,
  children,
  options,
  onChange,
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

  const activeTabID = useMemo(() => toTabID(activeTab), [activeTab, toTabID]);

  useEffect(() => {
    onChange?.(activeTab);
  }, [activeTab, onChange]);

  const getActiveTab = useCallback(() => {
    return activeTab;
  }, [activeTab]);

  useImperativeHandle(ref, () => getActiveTab, [getActiveTab]);

  const value = useMemo(
    () => ({
      toTabID,
      options,
      panelID,
      activeTab,
      ariaLabel,
      activeTabID,
      setActiveTab,
    }),
    [panelID, activeTab, ariaLabel, options, toTabID, activeTabID],
  );

  return <TabsContext value={value}>{children}</TabsContext>;
};

interface Props<T extends Tab> extends OptionalChildren {
  options: T[];
  ref?: RefObject<Callback | null>;
  onChange?: Callback<[ExtractValues<Props<T>["options"]>]>;
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
  activeTab: T["value"];
  ariaLabel: string;
  activeTabID: string;
  toTabID: Callback<[string], string>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}
