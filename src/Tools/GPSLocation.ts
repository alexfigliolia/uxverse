import { Callback } from "Types/Generics";

export class GPSLocation {
  public static readonly LOCATOR_OPTIONS = {
    timeout: 5000,
    maximumAge: 0,
  };
  public static readonly BROWSER_SUPPORT =
    typeof window !== "undefined" && !!window?.navigator?.geolocation;

  public static readonly INITIAL_LOCATION_ERROR: LocationError = this
    .BROWSER_SUPPORT
    ? "NONE"
    : "UNAVAILABLE";

  public static INITIAL_PERMISSION: Permission = this.BROWSER_SUPPORT
    ? "UNKNOWN"
    : "UNAVAILABLE";

  public static readonly watchPosition = this.withBrowserSupport(
    (
      onPosition: Callback<[GeolocationPosition]>,
      onError: Callback<[GeolocationPositionError]>,
    ) => {
      return navigator.geolocation.watchPosition(
        onPosition,
        onError,
        this.LOCATOR_OPTIONS,
      );
    },
  );

  public static readonly clearWatch = this.withBrowserSupport((ID: number) => {
    return navigator.geolocation.clearWatch(ID);
  });

  public static readonly getPosition = this.withBrowserSupport(
    (
      onPosition: Callback<[GeolocationPosition]>,
      onError: Callback<[GeolocationPositionError]>,
    ) => {
      return navigator.geolocation.getCurrentPosition(
        onPosition,
        onError,
        this.LOCATOR_OPTIONS,
      );
    },
  );

  public static withBrowserSupport<F extends (...args: any[]) => any>(func: F) {
    return (...args: Parameters<F>) => {
      if (this.BROWSER_SUPPORT) {
        return func(...args);
      }
    };
  }
}

export type Permission = "UNKNOWN" | "ALLOWED" | "DENIED" | "UNAVAILABLE";
export type LocationError = "TIMEOUT" | "UNAVAILABLE" | "NONE";
