import DateUtil from "../util/DateUtil.js";
import Component from "./Component.js";
export default class FromNow extends Component {
    intervalId;
    constructor(tag, date) {
        super(".from-now" + tag);
        if (date) {
            this.text = DateUtil.fromNow(date);
            this.intervalId = setInterval(() => {
                this.text = DateUtil.fromNow(date);
            }, 1000);
        }
    }
    delete() {
        if (this.intervalId)
            clearInterval(this.intervalId);
        super.delete();
    }
}
//# sourceMappingURL=FromNow.js.map