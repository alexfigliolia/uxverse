import { Fragment } from "react";
import { Gradients, Navigation } from "Layouts/InApp";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export default function InAppLayout({ children }: OptionalChildren) {
  return (
    <Fragment>
      <Gradients />
      <Navigation />
      <main className="visitor-app">{children}</main>
    </Fragment>
  );
}
