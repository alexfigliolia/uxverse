import Link from "next/link";
import { Visitor } from "Icons/Visitor";
import { Propless } from "Types/React";
import "./styles.scss";

export const Logo = (_: Propless) => {
  return (
    <Link className="logo" href="/">
      <Visitor />
    </Link>
  );
};
