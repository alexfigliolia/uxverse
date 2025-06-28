import { classnames } from "@figliolia/classnames";
import { DivOrSection, DivOrSectionProps } from "Types/DOM";
import "./styles.scss";

export const FullScreenContainer = <T extends DivOrSection = "section">({
  children,
  className,
  // @ts-ignore
  Tag = "section",
  ...rest
}: DivOrSectionProps<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("full-screen-container", className)} {...rest}>
      {children}
    </Tag>
  );
};
