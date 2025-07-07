export class InputPatterns {
  public static readonly fullName =
    "^(?!\\p{Zs})(?!.*\\p{Zs}$)[\\p{L}\\p{M}\\p{Zs}]{2,30} [\\p{L}\\p{M}\\p{Zs}]{2,30}$";
  public static readonly visitorHandle = "^[a-z0-9]{4,30}$";
  public static readonly instagramHandle = "^[a-z0-9._]{3,30}$";
  public static readonly tiktokHandle = "^[a-zA-Z0-9._]{3,24}$";
  public static readonly facebookURL = this.url("facebook", "com");
  public static readonly youtubeHandle = "^[a-zA-Z0-9._\\-]{3,30}$";

  public static url(domain: string, TLD: string) {
    return `^https?://(www\.)?${domain}\.${TLD}(?:/.*)?$`;
  }
}
