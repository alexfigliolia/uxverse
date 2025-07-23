import { GeoCoordinate } from "Types/Geolocation";

export class Haversine {
  public static inDistanceInMiles(
    location1: GeoCoordinate,
    location2: GeoCoordinate,
  ) {
    const R = 3958.8; // Radius of the Earth in miles

    const latitudeDistance = this.toRadians(
      location2.latitude - location1.latitude,
    );
    const longitudeDistance = this.toRadians(
      location2.longitude - location1.longitude,
    );

    const earthRotation =
      Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(this.toRadians(location1.latitude)) *
        Math.cos(this.toRadians(location2.latitude)) *
        Math.sin(longitudeDistance / 2) *
        Math.sin(longitudeDistance / 2);

    const flightDistance =
      2 * Math.atan2(Math.sqrt(earthRotation), Math.sqrt(1 - earthRotation));

    const distance = R * flightDistance;
    return distance;
  }

  private static toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
}
