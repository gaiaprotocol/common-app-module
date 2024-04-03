import el from "../../dom/el.js";
import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default class Popup extends Exitable {
    container;
    header;
    main;
    footer;
    constructor(tag, options) {
        super(".popup-overlay", options);
        this.container = new Component(".popup" + tag, this.header = el("header"), this.main = el("main"), this.footer = el("footer")).appendTo(this);
    }
}
//# sourceMappingURL=Popup.js.map