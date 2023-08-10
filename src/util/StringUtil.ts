export default class StringUtil {
  public static toTitleCase(str: string) {
    return str.replace(
      /(^\w|\s\w)(\S*)/g,
      (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
    );
  }

  public static numberWithCommas(x: string, fixed?: number) {
    if (fixed === undefined || +(+x) > Number.MAX_SAFE_INTEGER) {
      const parts = x.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts[1] === "0" ? parts[0] : parts.join(".");
    }
    const parts = String(+(+x).toFixed(fixed)).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
