export class InputPatterns {
  public static readonly fullName =
    "^(?!\\p{Zs})(?!.*\\p{Zs}$)[\\p{L}\\p{M}\\p{Zs}]{2,30} [\\p{L}\\p{M}\\p{Zs}]{2,30}$";
  public static readonly visitorHandle = "^[\\p{L}\\p{N}]{4,30}$";
  public static readonly instagramHandle = "^[a-z0-9._]{3,30}$";
  public static readonly tiktokHandle = "^[a-zA-Z0-9._]{3,24}$";
  public static readonly facebookURL = this.url("facebook", "com");
  public static readonly youtubeHandle = "^[a-zA-Z0-9._\\-]{3,30}$";
  public static readonly languageAgnosticAlphabets = new RegExp(/[^\p{L}]+/gu);
  public static readonly languageAgnosticAlphaNumberic = new RegExp(
    /[^\p{L}\p{N}]+/gu,
  );
  public static readonly capitalAlphabetsRegex = new RegExp(/[A-Z]+/);
  public static readonly instagramHandleValidator = new RegExp(/[^a-z0-9._]+/g);
  public static readonly tikotkHandleValidator = new RegExp(/[^a-zA-Z0-9._]+/g);
  public static readonly youtubeHandleValidator = new RegExp(
    /[^a-zA-Z0-9._\\-]+/g,
  );
  public static readonly facebookURLValidator = new RegExp(this.facebookURL);

  public static url(domain: string, TLD: string) {
    return `^https?://(www\.)?${domain}\.${TLD}(?:/.*)?$`;
  }
}
