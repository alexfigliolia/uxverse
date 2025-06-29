import { useClassNames } from "@figliolia/classnames";
import { useIsSafari } from "Hooks/useIsSafari";

export const useLiquidGlassClasses = (className?: string) => {
  const { isSafari, isMobile } = useIsSafari();
  return useClassNames("liquid-glass-button", className, {
    isSafari,
    isMobile,
  });
};
