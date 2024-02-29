import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";

export default class Confirm extends Popup {
  private resolve: (() => void) | undefined;
  private reject: (() => void) | undefined;

  constructor(
    options: {
      icon?: DomNode;
      title: string;
      message: string;
      cancelTitle?: string;
      confirmTitle?: string;
    },
    callback: () => Promise<void> | void,
    cancelCallback?: () => Promise<void> | void,
  ) {
    super(".confirm", { barrierDismissible: true });
    this.container.append(
      el("header", el("h1", options.icon, options.title)),
      el("main", el("p", options.message)),
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
              await callback();
              this.resolve?.();
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

  public async wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
