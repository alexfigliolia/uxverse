"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClassNames } from "@figliolia/classnames";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const IconLink = ({
  href,
  ariaLabel,
  IconFilled,
  IconStroked,
}: Props) => {
  const pathname = usePathname();
  const classes = useClassNames("icon-link", { active: pathname === href });
  return (
    <Link className={classes} href={href} aria-label={ariaLabel}>
      <div>
        <IconStroked aria-hidden />
        <IconFilled aria-hidden />
      </div>
    </Link>
  );
};

interface Props {
  href: string;
  ariaLabel: string;
  IconFilled: SVGComponent;
  IconStroked: SVGComponent;
}
