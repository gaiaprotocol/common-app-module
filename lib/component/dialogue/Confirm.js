import el from "../../dom/el.js";
import Component from "../Component.js";
import Loader from "../Loader.js";
import Popup from "../Popup.js";
export default class Confirm extends Popup {
    content;
    constructor(options, callback) {
        super({ barrierDismissible: true });
        this.append(this.content = new Component(".confirm", el("h1", options.title), el("p", options.message), el("footer", el("button.cancel-button", { click: () => this.delete() }, options.cancelTitle), el("button.confirm-button", {
            click: async (event, node) => {
                node.domElement.setAttribute("disabled", "disabled");
                node.empty().append(new Loader());
                await callback();
                this.delete();
            },
            style: `background-color: ${options.confirmColor}`,
        }, options.confirmTitle))));
    }
}
//# sourceMappingURL=Confirm.js.map