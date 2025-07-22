import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const VisuallyHiddenText = ({ children, Tag = "p" }: Props) => {
  return <Tag className="visually-hidden-text">{children}</Tag>;
};

interface Props extends OptionalChildren {
  Tag?: "span" | "p";
}
