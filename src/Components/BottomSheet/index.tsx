import { ForwardedRef, forwardRef } from "react";
import {
  BottomSheet as BottomSheetImpl,
  IBottomSheetProps,
  ISheetController,
} from "@figliolia/bottom-sheet";
import { Portal } from "Components/Portal";

export const BottomSheet = forwardRef(function BottomSheet(
  props: IBottomSheetProps,
  ref: ForwardedRef<ISheetController>,
) {
  return (
    <Portal>
      <BottomSheetImpl {...props} ref={ref} />;
    </Portal>
  );
});
