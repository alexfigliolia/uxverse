import { PlacesImageSlider } from "Components/PlacesImagesSlider";
import { FormattedPlace } from "../SearchExperience/useExploreData";
import "./style.scss";

// const TYPE_BLACKLIST = new Set(["point_of_interest", "establishment"]);

export const ExploreResult = ({
  // id,
  name,
  // types,
  // rating,
  photos,
  // address,
  // location,
  // reviewSummary,
}: FormattedPlace) => {
  return (
    <article className="explore-result">
      <PlacesImageSlider placeName={name} images={photos} />
    </article>
  );
};
