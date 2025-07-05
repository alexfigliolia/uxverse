import "react";

declare module "react" {
  export interface CSSProperties {
    "--index"?: number;
    "--length"?: number;
    "--max-height"?: string;
    "--theme-color"?: string;
    "--theme-gradient"?: string;
  }
}
