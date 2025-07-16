"use client";
import { ReactNode, use, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  ITabsContext,
  Tab as ITab,
  TabsContext,
} from "Components/Tabs/TabsContext";
import { Callback } from "Types/Generics";
import { Tab } from "./Tab";
import "./styles.scss";

export const Tabs = <T extends ITab>({
  className,
  ariaLabel,
  renderTab,
}: Props<T>) => {
  const { options, activeTab } = use(TabsContext) as ITabsContext<T>;

  const position = useMemo(
    () => options.findIndex(t => t.value === activeTab) ?? 0,
    [options, activeTab],
  );

  const classes = useClassNames("tabs", className);

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel}>
      <div
        aria-hidden
        className="underline"
        style={{
          translate: `${position * 100}%`,
          width: `${100 / options.length}%`,
        }}
      />
      {options.map(option => (
        <Tab<T> key={option.value} option={option} renderTab={renderTab} />
      ))}
    </div>
  );
};

interface Props<T extends ITab> {
  className?: string;
  ariaLabel: string;
  renderTab: Callback<[tab: T], ReactNode>;
}
