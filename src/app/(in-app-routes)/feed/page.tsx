import { TabsContextProvider } from "Components/Tabs/TabsContext";
import { Feed as FeedContent, Header } from "Layouts/Feed";
import { PostScreen } from "Layouts/Post";
import { Propless } from "Types/React";
import "./styles.scss";

const TABS = [
  {
    label: "Feed",
    value: "feed",
  },
  {
    value: "location",
    label: "Near By",
  },
];

export default function Feed(_: Propless) {
  return (
    <TabsContextProvider options={TABS}>
      <Header />
      <FeedContent />
      <PostScreen />
    </TabsContextProvider>
  );
}
