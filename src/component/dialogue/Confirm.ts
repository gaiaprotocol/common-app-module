import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../i18n/msg.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class Confirm extends Popup {
  public content: DomNode;

  private resolve: (() => void) | undefined;
  private reject: (() => void) | undefined;

  constructor(
    options: {
      title: string;
      message: string;
      cancelTitle?: string;
      confirmTitle?: string;
      loadingTitle?: string;
    },
    callback: () => Promise<void> | void,
    cancelCallback?: () => Promise<void> | void,
  ) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".popup.confirm",
        el("header", el("h1", options.title)),
        el("main", el("p", options.message)),
        el(
          "footer",
          new Button({
            type: ButtonType.Text,
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
              button.domElement.setAttribute("disabled", "disabled");
              if (options.loadingTitle) button.text = options.loadingTitle;
              await callback();
              this.resolve?.();
              this.reject = undefined;
              this.delete();
            },
            title: options.confirmTitle ?? msg("confirm-button"),
          }),
        ),
      ),
    );

    this.on("delete", () => {
      if (this.reject) this.reject();
    });
  }

  public async wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
