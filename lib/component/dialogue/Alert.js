import el from "../../dom/el.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class Alert extends Popup {
    constructor(options, callback) {
        super(".alert", { barrierDismissible: true });
        this.container.append(el("header", el("h1", options.title)), el("main", el("p", options.message)), el("footer", new Button({
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: async () => {
                if (callback)
                    await callback();
                this.delete();
            },
        })));
    }
}
//# sourceMappingURL=Alert.js.map