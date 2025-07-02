import { SVGComponent } from "Types/React";

export interface ProfileTab {
  value: "grid" | "posts";
  label: "grid" | "posts";
  IconFilled: SVGComponent;
  IconStroked: SVGComponent;
}
