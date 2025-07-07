import { ForwardedRef, forwardRef } from "react";
import { ISheetController } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { InAppBottomSheet, Props } from "../InAppBottomSheet";
import "./styles.scss";

export const AboveNavigationBottomSheet = forwardRef(
  function AboveNavigationBottomSheet(
    { className, children, ...rest }: Props,
    ref: ForwardedRef<ISheetController>,
  ) {
    const classes = useClassNames("above-navigation-bottom-sheet", className);
    return (
      <InAppBottomSheet className={classes} {...rest} ref={ref}>
        {children}
      </InAppBottomSheet>
    );
  },
);
