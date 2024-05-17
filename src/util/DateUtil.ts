import BrowserInfo from "../BrowserInfo.js";
import Constants from "../Constants.js";

class DateUtil {
  public format(date: string | number | Date, time = false) {
    if (date === Constants.NEGATIVE_INFINITY) return "";

    const inputDate = date instanceof Date ? date : new Date(date);

    const rtf = new Intl.DateTimeFormat(
      BrowserInfo.language,
      time
        ? {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
        : {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
    );

    return rtf.format(inputDate);
  }

  public fromNow(date: string | number | Date) {
    const inputDate = date instanceof Date ? date : new Date(date);
    const now = new Date();

    const diff = now.getTime() - inputDate.getTime();

    const seconds = Math.round(diff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    const rtf = new Intl.RelativeTimeFormat(BrowserInfo.language, {
      numeric: "auto",
      style: "narrow",
    });

    if (Math.abs(years) > 0) {
      return rtf.format(-years, "year");
    } else if (Math.abs(months) > 0) {
      return rtf.format(-months, "month");
    } else if (Math.abs(weeks) > 0) {
      return rtf.format(-weeks, "week");
    } else if (Math.abs(days) > 0) {
      return rtf.format(-days, "day");
    } else if (Math.abs(hours) > 0) {
      return rtf.format(-hours, "hour");
    } else if (Math.abs(minutes) > 0) {
      return rtf.format(-minutes, "minute");
    } else {
      return rtf.format(-seconds, "second");
    }
  }
}

export default new DateUtil();
