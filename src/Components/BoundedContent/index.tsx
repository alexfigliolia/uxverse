import { classnames } from "@figliolia/classnames";
import { ContainerElement, ContainerElementProps } from "Types/DOM";
import "./styles.scss";

export const BoundedContent = <T extends ContainerElement = "div">({
  children,
  className,
  // @ts-ignore
  Tag = "div",
  ...rest
}: ContainerElementProps<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("bounded-content", className)} {...rest}>
      <div>{children}</div>
    </Tag>
  );
};
