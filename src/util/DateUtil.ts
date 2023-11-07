import dayjs from "dayjs";

export default class DateUtil {
  public static fromNow(date: string | number | Date) {
    return dayjs(date).fromNow();
  }
}
