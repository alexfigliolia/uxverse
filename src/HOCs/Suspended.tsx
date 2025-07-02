import { ComponentType, Suspense } from "react";

export const Suspended = <T extends Record<string, any>>(
  Component: ComponentType<T>,
) => {
  return function Suspended(props: T) {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };
};
