import el from "../../dom/el.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class Alert extends Popup {
    constructor(options, callback) {
        super(".alert", { barrierDismissible: true });
        this.header.append(el("h1", options.icon, options.title));
        this.main.append(el("p", options.message));
        this.footer.append(new Button({
            tag: ".confirm",
            title: options.confirmTitle ?? "OK",
            onClick: async () => {
                if (callback)
                    await callback();
                this.delete();
            },
        }));
    }
}
//# sourceMappingURL=Alert.js.map