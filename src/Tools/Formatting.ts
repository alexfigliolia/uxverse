export class Formatting {
  public static readonly compactNumberFormatter = new Intl.NumberFormat(
    "en-us",
    {
      notation: "compact",
      compactDisplay: "short",
    },
  );

  public static formatCompact(value: number) {
    return this.compactNumberFormatter.format(value);
  }
}
