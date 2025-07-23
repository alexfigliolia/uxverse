import { ChangeEvent, use, useCallback, useMemo, useState } from "react";
import { useNearBySearch } from "Hooks/useNearBySearch";
import { usePlacesTextSearch } from "Hooks/usePlacesTextSearch";
import { Propless } from "Types/React";
import { ExploreResult } from "../ExploreResult";
import { MapLayoutContext } from "../MapLayout";
import { SearchInput } from "../SearchInput";
import { PlaceKeys, useExploreData } from "./useExploreData";
import "./styles.scss";

const FIELD_MASK =
  "places.id,places.displayName.text,places.rating,places.formattedAddress,places.shortFormattedAddress,places.types,places.location,places.photos.name,places.reviewSummary.text,places.websiteUri,places.googleMapsLinks.directionsUri,places.googleMapsLinks.placeUri,places.googleMapsLinks.reviewsUri";

export const SearchExperience = (_: Propless) => {
  const [search, setSearch] = useState("");
  const { location } = use(MapLayoutContext);
  const {
    results: searchResults,
    onSearch,
    // loading: searchResultsLoading,
    // hasNextPage: hasNextSearchPage,
    // fetchNextPage: fetchNextSearchPage,
  } = usePlacesTextSearch<PlaceKeys>(FIELD_MASK);
  const {
    results: nearByResults,
    // loading: nearByLoading
  } = useNearBySearch<PlaceKeys>("*", location);

  console.log(nearByResults);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
      setSearch(e.target.value);
    },
    [onSearch],
  );

  const results = useMemo(
    () => (search.length ? searchResults : nearByResults),
    [search, nearByResults, searchResults],
  );

  const places = useExploreData(results);

  return (
    <div className="explore-search-experience">
      <div>
        <search>
          <SearchInput onChange={onChange} />
        </search>
        <section className="explore-search-experience__results">
          {places.map(result => {
            if (result.id) {
              return <ExploreResult key={result.id} {...result} />;
            }
          })}
        </section>
      </div>
    </div>
  );
};
