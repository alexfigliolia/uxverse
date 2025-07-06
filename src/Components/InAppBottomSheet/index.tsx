import { ForwardedRef, forwardRef } from "react";
import {
  BottomSheet,
  IBottomSheetProps,
  ISheetController,
} from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const InAppBottomSheet = forwardRef(function InAppBottomSheet(
  { className, children, ...rest }: IBottomSheetProps,
  ref: ForwardedRef<ISheetController>,
) {
  const classes = useClassNames("in-app-bottom-sheet", className);
  return (
    <BottomSheet className={classes} {...rest} ref={ref}>
      {children}
    </BottomSheet>
  );
});
