import { AvatarGroup } from "Components/AvatarGroup";
import { FullBleedImage } from "Components/FullBleedImage";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { LocationFilled } from "Icons/Location";
import { Formatting } from "Tools/Formatting";
import { Propless } from "Types/React";
import "./style.scss";

export const ExploreResult = (_: Propless) => {
  return (
    <article className="explore-result">
      <figure>
        <FullBleedImage src="/place-3.jpg" alt="a place" />
        <figcaption>
          <ReducedLetterSpacing Tag="h3">Foreigner Cafe</ReducedLetterSpacing>
          <span>
            <LocationFilled aria-hidden />
            <ReducedLetterSpacing Tag="span">
              {Formatting.formatCompact(3)} miles away
            </ReducedLetterSpacing>
          </span>
        </figcaption>
      </figure>
      <div className="meta">
        <AvatarGroup />
      </div>
    </article>
  );
};
