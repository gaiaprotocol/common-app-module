import DateUtil from "../util/DateUtil.js";
import Component from "./Component.js";

export default class FromNow extends Component {
  private intervalId: number | undefined;

  constructor(tag: string, date: string | number | Date | undefined) {
    super(".from-now" + tag);
    if (date) {
      const d = date instanceof Date ? date : new Date(date);
      if (d.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) {
        this.text = DateUtil.fromNow(d);
        this.intervalId = setInterval(() => {
          this.text = DateUtil.fromNow(d);
        }, 1000) as any;
      }
    }
  }

  public delete(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    super.delete();
  }
}
