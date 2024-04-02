import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";
import Input from "../form/Input.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";

export default class Prompt extends Popup {
  private input: Input;
  private confirmButton: Button;

  private resolve: ((value: string) => void) | undefined;
  private reject: (() => void) | undefined;

  constructor(
    options: {
      icon?: DomNode;
      title: string;
      message: string;
      placeholder?: string;
      value?: string;
      multiline?: boolean;
      info?: string;
      cancelTitle?: string;
      confirmTitle?: string;
    },
    callback: (value: string) => Promise<void> | void,
    cancelCallback?: () => Promise<void> | void,
  ) {
    super(".prompt", { barrierDismissible: true });
    this.header.append(el("h1", options.icon, options.title));
    this.main.append(
      el("p", options.message),
      this.input = new Input({
        placeholder: options.placeholder,
        value: options.value,
        multiline: options.multiline,
      }),
      options.info
        ? new WarningMessageBox({
          message: options.info,
        })
        : undefined,
    );
    this.footer.append(
      new Button({
        tag: ".cancel",
        title: options.cancelTitle ?? msg("cancel-button"),
        click: () => {
          if (cancelCallback) cancelCallback();
          this.delete();
        },
      }),
      this.confirmButton = new Button({
        type: ButtonType.Contained,
        tag: ".confirm",
        title: options.confirmTitle ?? msg("confirm-button"),
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
      }),
    );
    this.on("delete", () => this.reject?.());

    this.input.select();
    this.input.on("enter", () => this.confirmButton.fireDomEvent("click"));
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
