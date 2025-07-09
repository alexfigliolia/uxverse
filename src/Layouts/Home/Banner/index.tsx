import { BlurAroundText } from "Components/BlurAroundText";
import { SplitText } from "Components/SplitText";
import { Propless } from "Types/React";
import { InsetFullScreenContainer } from "../InsetFullScreenContainer";
import { LoginButton } from "./LoginButton";
import "./styles.scss";

export function Banner(_: Propless) {
  return (
    <InsetFullScreenContainer className="home-banner">
      <BlurAroundText aria-label="Things to see, places to go">
        <SplitText text="Things to see," />
        <SplitText text="Places to go" />
      </BlurAroundText>
      <LoginButton />
      <BlurAroundText Tag="p" className="tagline">
        Community-curated hot-spots
      </BlurAroundText>
    </InsetFullScreenContainer>
  );
}
