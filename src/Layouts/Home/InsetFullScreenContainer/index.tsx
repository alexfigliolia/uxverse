import { classnames } from "@figliolia/classnames";
import { BoundedContent } from "Components/BoundedContent";
import { FullScreenContainer } from "Components/FullScreenContainer";
import { OptionalChildren } from "Types/React";
import { BackgroundImages } from "./BackgroundImages";
import "./styles.scss";

export const InsetFullScreenContainer = ({ className, children }: Props) => {
  return (
    <FullScreenContainer
      className={classnames("inset-fullscreen-container", className)}>
      <div>
        <BackgroundImages />
        <div className="inset-fullscreen-container__content">
          <BoundedContent>{children}</BoundedContent>
        </div>
      </div>
    </FullScreenContainer>
  );
};

interface Props extends OptionalChildren {
  className?: string;
}
