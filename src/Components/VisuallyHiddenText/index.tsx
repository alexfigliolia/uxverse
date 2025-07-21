import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const VisuallyHiddenText = ({ children }: OptionalChildren) => {
  return <p className="visually-hidden-text">{children}</p>;
};
