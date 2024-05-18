import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default class SidePanel extends Exitable {
    container;
    constructor(tag, options) {
        super(".side-panel-overlay", {
            barrierDismissible: true,
            ...options,
        });
        this.container = new Component(".side-panel" + tag + (options.toLeft ? ".to-left" : "")).appendTo(this);
    }
}
//# sourceMappingURL=SidePanel.js.map