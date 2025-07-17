import { TabsWithSearchParamContextProvider } from "Components/Tabs";
import { Feed as FeedContent, Header } from "Layouts/Feed";
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
    <TabsWithSearchParamContextProvider paramKey="view" options={TABS}>
      <Header />
      <FeedContent />
    </TabsWithSearchParamContextProvider>
  );
}
