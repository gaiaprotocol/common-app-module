import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";
export default class Confirm extends Popup {
    resolve;
    reject;
    constructor(options, callback, cancelCallback) {
        super(".confirm", { barrierDismissible: true });
        this.header.append(el("h1", options.icon, options.title));
        this.main.append(el("p", options.message));
        this.footer.append(new Button({
            tag: ".cancel-button",
            click: () => {
                if (cancelCallback) {
                    cancelCallback();
                }
                this.delete();
            },
            title: options.cancelTitle ?? msg("cancel-button"),
        }), new Button({
            type: ButtonType.Contained,
            tag: ".confirm-button",
            click: async (event, button) => {
                button.loading = true;
                try {
                    await callback();
                    this.resolve?.();
                    this.reject = undefined;
                    this.delete();
                }
                catch (e) {
                    console.error(e);
                    button.loading = false;
                    this.reject?.();
                }
            },
            title: options.confirmTitle ?? msg("confirm-button"),
        }));
        this.on("delete", () => this.reject?.());
    }
    async wait() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
//# sourceMappingURL=Confirm.js.map