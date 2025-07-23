import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const TagGroup = ({
  tags,
  children,
  className,
  "aria-label": ariaLabel = "Tags",
  ...rest
}: Props) => {
  return (
    <ul
      className={classnames("tag-group", className)}
      aria-label={ariaLabel}
      {...rest}>
      {tags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
      {children}
    </ul>
  );
};

interface Props extends HTMLProps<HTMLUListElement> {
  tags: string[];
}
