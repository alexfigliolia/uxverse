"use client";
import { ReactNode, use, useCallback, useMemo } from "react";
import { Callback } from "Types/Generics";
import { ITabsContext, Tab as ITab, TabsContext } from "./TabsContext";

export const Tab = <T extends ITab>({ renderTab, option }: Props<T>) => {
  const { toTabID, setActiveTab, panelID, activeTab } = use(
    TabsContext,
  ) as ITabsContext<T>;

  const ID = useMemo(() => toTabID(option.value), [toTabID, option.value]);

  const onClick = useCallback(() => {
    setActiveTab(option.value);
  }, [setActiveTab, option.value]);

  return (
    <button
      id={ID}
      key={ID}
      role="tab"
      onClick={onClick}
      aria-controls={panelID}
      aria-selected={activeTab === option.value}>
      {renderTab(option)}
    </button>
  );
};

interface Props<T extends ITab> {
  option: T;
  renderTab: Callback<[tab: T], ReactNode>;
}
