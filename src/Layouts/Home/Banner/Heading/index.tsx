"use client";
import { SplitText } from "Components/SplitText";
import { UX } from "Components/UX";
import { Propless } from "Types/React";
import "./styles.scss";

export const Heading = (_: Propless) => {
  return (
    <h1>
      <UX />
      <SplitText text="verse" />
    </h1>
  );
};
