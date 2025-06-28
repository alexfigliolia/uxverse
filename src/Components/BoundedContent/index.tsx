import { classnames } from "@figliolia/classnames";
import { DivOrSection, DivOrSectionProps } from "Types/DOM";
import "./styles.scss";

export const BoundedContent = <T extends DivOrSection = "div">({
  children,
  className,
  // @ts-ignore
  Tag = "div",
  ...rest
}: DivOrSectionProps<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("bounded-content", className)} {...rest}>
      <div>{children}</div>
    </Tag>
  );
};
