import { Fragment } from "react";
import { SVGGradient } from "Components/SVGGradient";
import Variables from "Styles/Exports.module.scss";
import { Propless } from "Types/React";

export const Gradients = (_: Propless) => {
  return (
    <Fragment>
      <SVGGradient
        x1={0}
        y1={0}
        x2={1}
        y2={1}
        id="themeGradient"
        colors={[Variables.orange, Variables.red]}
      />
      <SVGGradient
        x1={0}
        y1={0}
        x2={1}
        y2={0}
        id="cyanToGreen"
        colors={[Variables.cyan, Variables.green]}
      />
      <SVGGradient
        x1={0}
        y1={0}
        x2={1}
        y2={1}
        id="warning"
        colors={[Variables.warningYellow, Variables.warningOrange]}
      />
    </Fragment>
  );
};
