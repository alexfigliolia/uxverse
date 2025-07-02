"use client";
import { ReactNode, useContext, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ITabsContext, Tab, TabsContext } from "Components/Tabs/TabsContext";
import "./styles.scss";

export const Tabs = <T extends Tab>({
  className,
  ariaLabel,
  renderTab,
}: Props<T>) => {
  const { options, toTabID, setActiveTab, panelID, activeTab } = useContext(
    TabsContext,
  ) as ITabsContext<T>;

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
      {options.map(option => {
        const ID = toTabID(option.value);
        const onClick = () => setActiveTab(option.value);
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
      })}
    </div>
  );
};

interface Props<T extends Tab> {
  className?: string;
  ariaLabel: string;
  renderTab: (tab: T) => ReactNode;
}
