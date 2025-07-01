import "react";

declare module "react" {
  declare namespace JSX {
    export interface IntrinsicElements {
      "gmp-map": {
        center: string;
        zoom: number;
      };
    }
  }
}
