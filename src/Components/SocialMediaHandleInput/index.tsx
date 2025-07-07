import { useClassNames } from "@figliolia/classnames";
import { Input, type Props as InputProps } from "Components/Input";
import "./styles.scss";

export const SocialMediaHandleInput = ({
  className,
  ...rest
}: Omit<InputProps, "type" | "spellCheck" | "inputPrefix">) => {
  const classes = useClassNames("social-media-handle-input", className);
  return (
    <Input
      type="text"
      spellCheck={false}
      className={classes}
      {...rest}
      inputPrefix={<span className="at">@&nbsp;</span>}
    />
  );
};
