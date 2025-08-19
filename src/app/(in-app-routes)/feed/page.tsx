import { TabsContextProvider } from "Components/Tabs";
import { Feed as FeedContent, Header } from "Layouts/Feed";
import { Propless } from "Types/React";
import "./styles.scss";

const TABS = [
  {
    label: "Feed",
    value: "feed",
  },
  {
    value: "trending",
    label: "Trending",
  },
];

export default function Feed(_: Propless) {
  return (
    <TabsContextProvider options={TABS}>
      <Header />
      <FeedContent />
    </TabsContextProvider>
  );
}
