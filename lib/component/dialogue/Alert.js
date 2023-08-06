import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
export default class Alert extends Popup {
    content;
    constructor(options) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".alert", el("h1", options.title), el("p", options.message), el("footer", el("button.confirm-button", { click: () => this.delete() }, options.confirmTitle))));
    }
}
//# sourceMappingURL=Alert.js.map