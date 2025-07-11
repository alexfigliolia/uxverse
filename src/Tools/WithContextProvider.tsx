import { ComponentType } from "react";
import { OptionalChildren } from "Types/React";

export const WithContextProvider = (
  Provider: ComponentType<OptionalChildren>,
) => {
  return <T extends Record<string, any>>(Component: ComponentType<T>) => {
    return function WithContextProvider(props: T) {
      return (
        <Provider>
          <Component {...props} />
        </Provider>
      );
    };
  };
};
