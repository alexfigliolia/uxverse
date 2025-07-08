import { ComponentType } from "react";
import { PopoverProvider } from "Components/Popover";

export const withPopoverContext = <T extends Record<string, any>>(
  WrappedComponent: ComponentType<T>,
) => {
  return function PopoverContextComponent(props: T) {
    return (
      <PopoverProvider>
        <WrappedComponent {...props} />
      </PopoverProvider>
    );
  };
};
