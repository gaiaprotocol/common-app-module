import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default class Drawer extends Exitable {
    container;
    constructor(tag, options) {
        super(".drawer-overlay", {
            barrierDismissible: true,
            ...options,
        });
        this.container = new Component(".drawer" + tag).appendTo(this);
    }
}
//# sourceMappingURL=Drawer.js.map