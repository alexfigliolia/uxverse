import "react";

declare module "react" {
  export interface CSSProperties {
    "--index"?: number;
    "--length"?: number;
  }
}
