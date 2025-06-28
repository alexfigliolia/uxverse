import { useClassNames } from "@figliolia/classnames";
import { SafariAwareText } from "Components/SafariAwareText";
import { TextProps, TextTag } from "Types/DOM";
import "./styles.scss";

export const BlurAroundText = <T extends TextTag>({
  className,
  children,
  ...rest
}: TextProps<T>) => {
  const classes = useClassNames("blur-around-text", className);
  return (
    <SafariAwareText className={classes} {...rest}>
      {children}
    </SafariAwareText>
  );
};
