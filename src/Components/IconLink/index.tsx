"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClassNames } from "@figliolia/classnames";
import { SVGComponent } from "Types/React";
import "./styles.scss";

export const IconLink = ({ label, href, IconFilled, IconStroked }: Props) => {
  const pathname = usePathname();
  const classes = useClassNames("icon-link", { active: pathname === href });
  return (
    <Link className={classes} href={href}>
      <div>
        <IconStroked aria-hidden />
        <IconFilled aria-hidden />
      </div>
      <span>{label}</span>
    </Link>
  );
};

interface Props {
  label: string;
  href: string;
  IconFilled: SVGComponent;
  IconStroked: SVGComponent;
}
