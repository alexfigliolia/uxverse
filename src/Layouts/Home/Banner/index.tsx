import { BlurAroundText } from "Components/BlurAroundText";
import { BoundedContent } from "Components/BoundedContent";
import { FullScreenContainer } from "Components/FullScreenContainer";
import { ImageRotator } from "Components/ImageRotator";
import { LiquidGlassButton } from "Components/LiquidGlassButton";
import { SplitText } from "Components/SplitText";
import { Propless } from "Types/React";
import "./styles.scss";

export function Banner(_: Propless) {
  return (
    <FullScreenContainer className="home-banner">
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
        <div className="home-banner__content">
          <BoundedContent>
            <BlurAroundText aria-label="Things to see, places to go">
              {/* <span>Things to see,</span>
              <span>Places to go</span> */}
              <SplitText text="Things to see," />
              <SplitText text="Places to go" />
            </BlurAroundText>
            <LiquidGlassButton>Explore</LiquidGlassButton>
            <BlurAroundText Tag="p" className="tagline">
              Curated by your community
            </BlurAroundText>
          </BoundedContent>
        </div>
      </div>
    </FullScreenContainer>
  );
}
