import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default class Popup extends Exitable {
    container;
    constructor(tag, options) {
        super(options);
        this.container = new Component(".popup" + tag).appendTo(this);
    }
}
//# sourceMappingURL=Popup.js.map