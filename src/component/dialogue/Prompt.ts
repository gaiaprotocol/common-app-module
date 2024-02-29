import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";
import Input from "../form/Input.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";

export default class Prompt extends Popup {
  private input: Input;

  private resolve: ((value: string) => void) | undefined;
  private reject: (() => void) | undefined;

  constructor(
    options: {
      title: string;
      message: string;
      placeholder?: string;
      value?: string;
      info?: string;
      cancelTitle?: string;
      confirmTitle?: string;
    },
    callback: (value: string) => Promise<void> | void,
    cancelCallback?: () => Promise<void> | void,
  ) {
    super(".prompt", { barrierDismissible: true });
    this.container.append(
      el("header", el("h1", options.title)),
      el(
        "main",
        el("p", options.message),
        this.input = new Input({
          placeholder: options.placeholder,
          value: options.value,
        }),
        options.info
          ? new WarningMessageBox({
            message: options.info,
          })
          : undefined,
      ),
      el(
        "footer",
        new Button({
          tag: ".cancel-button",
          click: () => {
            if (cancelCallback) {
              cancelCallback();
            }
            this.delete();
          },
          title: options.cancelTitle ?? msg("cancel-button"),
        }),
        new Button({
          type: ButtonType.Contained,
          tag: ".confirm-button",
          click: async (event, button) => {
            button.loading = true;

            try {
              await callback(this.input.value);
              this.resolve?.(this.input.value);
              this.reject = undefined;
              this.delete();
            } catch (e) {
              console.error(e);
              button.loading = false;
              this.reject?.();
            }
          },
          title: options.confirmTitle ?? msg("confirm-button"),
        }),
      ),
    );
    this.on("delete", () => this.reject?.());
  }

  public set value(value: string) {
    this.input.value = value;
  }

  public async wait(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
