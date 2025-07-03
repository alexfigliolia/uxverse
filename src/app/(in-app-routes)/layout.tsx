"use client";
import {
  Gradients,
  Navigation,
  ReactionList,
  ReactionListProvider,
} from "Layouts/InApp";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export default function InAppLayout({ children }: OptionalChildren) {
  return (
    <ReactionListProvider>
      <Gradients />
      <Navigation />
      <main className="visitor-app">{children}</main>
      <ReactionList />
    </ReactionListProvider>
  );
}
