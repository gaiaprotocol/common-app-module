import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
export default class Confirm extends Popup {
    content;
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
            click: async (event, node) => {
                node.domElement.setAttribute("disabled", "disabled");
                if (options.loadingTitle)
                    node.text = options.loadingTitle;
                await callback();
                this.delete();
            },
            title: options.confirmTitle ?? msg("confirm-button"),
        }))));
    }
}
//# sourceMappingURL=Confirm.js.map