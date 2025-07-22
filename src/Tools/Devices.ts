export class Devices {
  public static IS_MOBILE = this.detect();

  public static detect() {
    if (typeof window === "undefined" || !window.navigator) {
      return false;
    }
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
}
