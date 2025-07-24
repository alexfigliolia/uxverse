import { use, useMemo } from "react";
import { ExpandableText } from "Components/ExpandableText";
import { GooglePlacesTags } from "Components/GooglePlacesTags";
import { PlacesImageSlider } from "Components/PlacesImagesSlider";
import { Rating } from "Components/Rating";
import { ReducedLetterSpacing } from "Components/ReducedLetterSpacing";
import { HappyFace } from "Icons/Faces";
import { GoogleMono } from "Icons/Google";
import { LocationStroked } from "Icons/Location";
import { NavigationIcon } from "Icons/Navigation";
import { WebsiteIcon } from "Icons/Website";
import { Formatting } from "Tools/Formatting";
import { Haversine } from "Tools/Haversine";
import { MapLayoutContext } from "../MapLayout";
import { PostAboutButton } from "../PostAboutButton";
import { ResultOption, ResultOptions } from "../ResultOptions";
import { FormattedPlace } from "../SearchExperience/useExploreData";
import "./style.scss";

export const ExploreResult = ({
  id,
  name,
  types,
  rating,
  photos,
  website,
  // address,
  location,
  googleURL,
  reviewsURL,
  directionsURL,
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

  const expandOptions: ResultOption[] = useMemo(
    () => [
      ...(website
        ? [
            {
              id: 1,
              label: "Visit Website",
              url: website,
              Icon: WebsiteIcon,
            },
          ]
        : []),
      {
        id: 2,
        label: "Get Directions",
        url: directionsURL,
        Icon: NavigationIcon,
      },
      {
        id: 3,
        label: "See Reviews",
        url: reviewsURL,
        Icon: HappyFace,
      },
      {
        id: 4,
        label: "View on Google",
        url: googleURL,
        Icon: GoogleMono,
      },
    ],
    [website, googleURL, reviewsURL, directionsURL],
  );

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
            <PostAboutButton placeID={id} placeName={name} />
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
