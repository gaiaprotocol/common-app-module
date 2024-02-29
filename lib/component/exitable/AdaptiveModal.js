import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default class AdaptiveModal extends Exitable {
    container;
    constructor(tag, options) {
        super(options);
        this.container = new Component(".adaptive-modal" + tag).appendTo(this);
    }
}
//# sourceMappingURL=AdaptiveModal.js.map