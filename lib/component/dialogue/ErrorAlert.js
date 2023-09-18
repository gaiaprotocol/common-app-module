import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
export default class Alert extends Popup {
    content;
    constructor(options) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".error-alert", el("h1", new MaterialIcon("error"), options.title), el("p", options.message), el("footer", new Button({
            type: ButtonType.Text,
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: () => this.delete(),
        }))));
    }
}
//# sourceMappingURL=ErrorAlert.js.map