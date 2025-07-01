import { classnames } from "@figliolia/classnames";
import { ContainerElement, ContainerElementProps } from "Types/DOM";
import "./styles.scss";

export const FullScreenContainer = <T extends ContainerElement = "section">({
  children,
  className,
  // @ts-ignore
  Tag = "section",
  ...rest
}: ContainerElementProps<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("full-screen-container", className)} {...rest}>
      {children}
    </Tag>
  );
};
