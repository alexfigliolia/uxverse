import "react";

declare module "react" {
  export interface CSSProperties {
    "--index"?: number;
    "--level"?: number;
    "--length"?: number;
    "--max-height"?: string;
    "--theme-color"?: string;
    "--theme-gradient"?: string;
    "--scroll-height"?: string;
    "--client-height"?: string;
  }
}
