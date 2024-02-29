import el from "../../dom/el.js";
import Icon from "../Icon.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class ErrorAlert extends Popup {
    constructor(options) {
        super(".error-alert", { barrierDismissible: true });
        this.container.append(el("header", el("h1", new Icon("error"), options.title)), el("main", el("p", options.message)), el("footer", new Button({
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: () => this.delete(),
        })));
    }
}
//# sourceMappingURL=ErrorAlert.js.map