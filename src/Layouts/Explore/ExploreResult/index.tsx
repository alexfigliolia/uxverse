import { use, useMemo } from "react";
import { ExpandableText } from "Components/ExpandableText";
import { GooglePlacesTags } from "Components/GooglePlacesTags";
import { PlacesImageSlider } from "Components/PlacesImagesSlider";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { LocationStroked } from "Icons/Location";
import { Formatting } from "Tools/Formatting";
import { Haversine } from "Tools/Haversine";
import { MapLayoutContext } from "../MapLayout";
import { FormattedPlace } from "../SearchExperience/useExploreData";
import "./style.scss";

export const ExploreResult = ({
  // id,
  name,
  types,
  // rating,
  photos,
  // address,
  location,
  reviewSummary,
}: FormattedPlace) => {
  const { location: userLocation } = use(MapLayoutContext);

  const distance = useMemo(
    () =>
      userLocation && location
        ? Formatting.formatCompact(
            Haversine.inDistanceInMiles(userLocation, location),
          )
        : "",
    [userLocation, location],
  );

  return (
    <article className="explore-result">
      <PlacesImageSlider placeName={name} images={photos} />
      <div className="explore-result__content">
        <div className="explore-result__headline">
          <ReducedLetterSpacing Tag="h2">{name}</ReducedLetterSpacing>
          {distance && (
            <div className="explore-result__distance">
              <LocationStroked aria-hidden />
              <ReducedLetterSpacing Tag="span">
                {distance} miles away
              </ReducedLetterSpacing>
            </div>
          )}
        </div>
        <GooglePlacesTags tags={types} />
        {reviewSummary && (
          <div className="explore-result__summary">
            <div>
              <ExpandableText>
                <p>{reviewSummary}</p>
              </ExpandableText>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
