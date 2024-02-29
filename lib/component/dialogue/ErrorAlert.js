import el from "../../dom/el.js";
import Icon from "../Icon.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class ErrorAlert extends Popup {
    constructor(options) {
        super(".error-alert", { barrierDismissible: true });
        this.header.append(el("h1", new Icon("error"), options.title));
        this.main.append(el("p", options.message));
        this.footer.append(new Button({
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=ErrorAlert.js.map