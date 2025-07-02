import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { Tabs } from "Components/Tabs";
import { Propless } from "Types/React";
import "./styles.scss";

export const FeedTabs = (_: Propless) => {
  return (
    <Tabs
      ariaLabel="Feed View Selector"
      className="feed-tabs"
      renderTab={tab => (
        <ReducedLetterSpacing Tag="span">{tab.label}</ReducedLetterSpacing>
      )}
    />
  );
};
