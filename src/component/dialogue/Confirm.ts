import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import Popup from "../exitable/Popup.js";

export default class Confirm extends Popup {
  private resolve: (() => void) | undefined;
  private reject: ((reason: Error) => void) | undefined;

  constructor(
    options: {
      icon?: DomNode;
      title: string;
      message: string;
      cancelTitle?: string;
      confirmTitle?: string;
    },
    callback?: () => Promise<void> | void,
    cancelCallback?: () => Promise<void> | void,
  ) {
    super(".confirm", { barrierDismissible: true });
    this.header.append(el("h1", options.icon, options.title));
    this.main.append(el("p", options.message));
    this.footer.append(
      new Button({
        tag: ".cancel",
        title: options.cancelTitle ?? msg("cancel-button"),
        onClick: () => {
          if (cancelCallback) cancelCallback();
          this.delete();
        },
      }),
      new Button({
        type: ButtonType.Contained,
        tag: ".confirm",
        title: options.confirmTitle ?? msg("confirm-button"),
        onClick: async (button) => {
          button.loading = true;

          try {
            if (callback) await callback();
            this.resolve?.();
            this.reject = undefined;
            this.delete();
          } catch (e) {
            console.error(e);
            button.loading = false;
          }
        },
      }),
    );
    this.on("delete", () => this.reject?.(new Error("Canceled by user")));
  }

  public async wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
