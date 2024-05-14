import DateUtil from "../util/DateUtil.js";
import Component from "./Component.js";

export default class FromNow extends Component {
  private intervalId: number | undefined;

  constructor(tag: string, date: string | number | Date | undefined) {
    super(".from-now" + tag);
    if (date) {
      this.text = DateUtil.fromNow(date);
      this.intervalId = setInterval(() => {
        this.text = DateUtil.fromNow(date);
      }, 1000) as any;
    }
  }

  public delete(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    super.delete();
  }
}
