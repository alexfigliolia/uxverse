import Link from "next/link";
import { classnames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const NakedLink = ({ className, ...rest }: Props) => {
  return <Link className={classnames("naked-link", className)} {...rest} />;
};

interface Props extends OptionalChildren {
  className?: string;
  href: string;
}
