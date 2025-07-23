import { useMemo } from "react";
import { IPlace } from "PlacesClient/index";
import { GeoCoordinate } from "Types/Geolocation";

export const useExploreData = (places: Pick<IPlace, PlaceKeys>[]) => {
  return useMemo(() => {
    const results: FormattedPlace[] = [];
    for (const place of places) {
      if (!place.id) {
        continue;
      }
      const photos: string[] = [];
      const photoList = place.photos ?? [];
      for (const photo of photoList) {
        if (photo.name) {
          photos.push(photo.name);
        }
      }
      results.push({
        photos,
        id: place.id,
        location: place.location as unknown as GeoCoordinate,
        types: place.types ?? [],
        name: place.displayName?.text ?? "",
        address: place.shortFormattedAddress ?? place.formattedAddress ?? "",
        // TODO - fix openapi file
        // @ts-ignore
        reviewSummary: place.reviewSummary?.text?.text ?? "",
      });
    }
    return results;
  }, [places]);
};

export type PlaceKeys =
  | "id"
  | "displayName"
  | "rating"
  | "location"
  | "formattedAddress"
  | "shortFormattedAddress"
  | "types"
  | "photos"
  | "reviewSummary";

export interface FormattedPlace {
  id: string;
  photos: string[];
  types: string[];
  name: string;
  rating?: number;
  location?: GeoCoordinate;
  address: string;
  reviewSummary?: string;
}
