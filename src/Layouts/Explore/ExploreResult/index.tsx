import { use, useMemo } from "react";
import { ExpandableText } from "Components/ExpandableText";
import { GooglePlacesTags } from "Components/GooglePlacesTags";
import { PlacesImageSlider } from "Components/PlacesImagesSlider";
import { Rating } from "Components/Rating";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { LocationStroked } from "Icons/Location";
import { Formatting } from "Tools/Formatting";
import { Haversine } from "Tools/Haversine";
import { MapLayoutContext } from "../MapLayout";
import { PostAboutButton } from "../PostAboutButton";
import { ResultOptions } from "../ResultOptions";
import { FormattedPlace } from "../SearchExperience/useExploreData";
import { useExpandOptions } from "./useExpandOptions";
import "./style.scss";

export const ExploreResult = ({
  name,
  types,
  rating,
  photos,
  location,
  reviewSummary,
  ...rest
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

  const expandOptions = useExpandOptions(rest);

  return (
    <article className="explore-result">
      <PlacesImageSlider placeName={name} images={photos} />
      <div className="explore-result__content">
        <div className="explore-result__headline">
          <div className="explore-result__title">
            <ReducedLetterSpacing Tag="h2">{name}</ReducedLetterSpacing>
          </div>
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
        <div className="explore-result__footer">
          <div>
            <PostAboutButton placeID={rest.id} placeName={name} />
          </div>
          <div>
            {typeof rating === "number" && <Rating stars={rating} />}
            <ResultOptions name={name} options={expandOptions} />
          </div>
        </div>
      </div>
    </article>
  );
};
