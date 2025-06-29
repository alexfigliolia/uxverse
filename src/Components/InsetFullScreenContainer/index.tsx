import { classnames } from "@figliolia/classnames";
import { BoundedContent } from "Components/BoundedContent";
import { FullScreenContainer } from "Components/FullScreenContainer";
import { ImageRotator } from "Components/ImageRotator";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const InsetFullScreenContainer = ({ className, children }: Props) => {
  return (
    <FullScreenContainer
      className={classnames("inset-fullscreen-container", className)}>
      <div>
        <ImageRotator
          images={["/background-pink.jpg", "/background-neon.jpg"]}
          options={{
            arrowKey: false,
            autoplay: true,
            direction: 1,
            draggable: false,
            duration: 750,
            ease: "ease-out",
            interval: 10000,
            loop: true,
            mousewheel: false,
            start: 0,
            transition: "bombCoverIn",
          }}
        />
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
