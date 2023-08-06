import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
export default class ErrorAlert extends Popup {
    content;
    constructor(options) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".error-alert", el("header", el("i.fa-light.fa-triangle-exclamation"), el("h1", options.title)), el("main", el("p", options.message)), el("footer", el("button.confirm-button", { click: () => this.delete() }, options.confirmTitle))));
    }
}
//# sourceMappingURL=ErrorAlert.js.map