import { ReactNode } from "react";

export interface OptionalChildren {
  children?: ReactNode;
}

export type Propless = Record<string, never>;
