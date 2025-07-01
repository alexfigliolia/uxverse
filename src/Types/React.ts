import { ComponentType, ReactNode, SVGProps } from "react";

export interface OptionalChildren {
  children?: ReactNode;
}

export type Propless = Record<string, never>;

export type SVGComponent = ComponentType<SVGProps<SVGSVGElement>>;
