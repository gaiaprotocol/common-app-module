import el from "../../dom/el.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class Alert extends Popup {
    constructor(options, callback) {
        super(".alert", { barrierDismissible: true, hasHidingAnimation: true });
        this.header.append(el("h1", options.icon, options.title));
        this.main.append(el("p", options.message));
        this.footer.append(new Button({
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: async () => {
                if (callback)
                    await callback();
                this.delete();
            },
        }));
    }
}
//# sourceMappingURL=Alert.js.map