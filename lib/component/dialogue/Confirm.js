import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
export default class Confirm extends Popup {
    content;
    resolve;
    reject;
    constructor(options, callback, cancelCallback) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".popup.confirm", el("header", el("h1", options.title)), el("main", el("p", options.message)), el("footer", new Button({
            type: ButtonType.Text,
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
                button.domElement.setAttribute("disabled", "disabled");
                if (options.loadingTitle)
                    button.text = options.loadingTitle;
                try {
                    await callback();
                    this.resolve?.();
                    this.reject = undefined;
                    this.delete();
                }
                catch (e) {
                    console.error(e);
                    button.domElement.removeAttribute("disabled");
                    button.text = options.confirmTitle ?? msg("confirm-button");
                    this.reject?.();
                }
            },
            title: options.confirmTitle ?? msg("confirm-button"),
        }))));
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