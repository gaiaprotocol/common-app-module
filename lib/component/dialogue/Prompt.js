import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";
import Input from "../form/Input.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";
export default class Prompt extends Popup {
    input;
    resolve;
    reject;
    constructor(options, callback, cancelCallback) {
        super(".prompt", { barrierDismissible: true });
        this.header.append(el("h1", options.icon, options.title));
        this.main.append(el("p", options.message), this.input = new Input({
            placeholder: options.placeholder,
            value: options.value,
        }), options.info
            ? new WarningMessageBox({
                message: options.info,
            })
            : undefined);
        this.footer.append(new Button({
            tag: ".cancel-button",
            click: () => {
                if (cancelCallback)
                    cancelCallback();
                this.delete();
            },
            title: options.cancelTitle ?? msg("cancel-button"),
        }), new Button({
            type: ButtonType.Contained,
            tag: ".confirm-button",
            click: async (event, button) => {
                button.loading = true;
                try {
                    await callback(this.input.value);
                    this.resolve?.(this.input.value);
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
    set value(value) {
        this.input.value = value;
    }
    async wait() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
//# sourceMappingURL=Prompt.js.map