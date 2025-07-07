import { ForwardedRef, forwardRef } from "react";
import { IBottomSheetProps, ISheetController } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { BottomSheet } from "Components/BottomSheet";
import "./styles.scss";

export const InAppBottomSheet = forwardRef(function InAppBottomSheet(
  { className, children, ...rest }: Props,
  ref: ForwardedRef<ISheetController>,
) {
  const classes = useClassNames("in-app-bottom-sheet", className);
  return (
    <BottomSheet dim notch className={classes} {...rest} ref={ref}>
      {children}
    </BottomSheet>
  );
});

export type Props = Omit<IBottomSheetProps, "dim" | "notch">;
