import dynamic from "next/dynamic";

export const LazyLowPriorityRender = dynamic(
  () => import("./index").then(v => v.LowPriorityRender),
  { ssr: false },
);
