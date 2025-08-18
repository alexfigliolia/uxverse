import { BlurAroundText } from "Components/BlurAroundText";
import { Propless } from "Types/React";
import { InsetFullScreenContainer } from "../InsetFullScreenContainer";
import { Heading } from "./Heading";
import { LoginButton } from "./LoginButton";
import "./styles.scss";

export function Banner(_: Propless) {
  return (
    <InsetFullScreenContainer className="home-banner">
      <Heading />
      <LoginButton />
      <BlurAroundText Tag="p" className="tagline">
        Community-curated exemplory UX
      </BlurAroundText>
    </InsetFullScreenContainer>
  );
}
