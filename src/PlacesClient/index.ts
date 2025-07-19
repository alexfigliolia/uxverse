import createClient from "openapi-fetch";
import type { components, paths } from "./types";

export const GooglePlaces = createClient<paths>({
  baseUrl: "https://content-places.googleapis.com",
});

export type IPlace = components["schemas"]["Place"];
