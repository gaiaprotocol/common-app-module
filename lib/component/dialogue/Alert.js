import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
export default class Alert extends Popup {
    content;
    constructor(options, callback) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".popup.alert", el("header", el("h1", options.title)), el("main", el("p", options.message)), el("footer", new Button({
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: async () => {
                if (callback)
                    await callback();
                this.delete();
            },
        }))));
    }
}
//# sourceMappingURL=Alert.js.map