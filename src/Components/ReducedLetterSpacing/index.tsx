import { classnames } from "@figliolia/classnames";
import { TextProps, TextTag } from "Types/DOM";
import "./styles.scss";
export const ReducedLetterSpacing = <T extends TextTag>({
  // @ts-ignore
  Tag = "h1",
  className,
  children,
  ...rest
}: TextProps<T>) => {
  return (
    // @ts-ignore
    <Tag className={classnames("reduced-letter-spacing", className)} {...rest}>
      {children}
    </Tag>
  );
};
