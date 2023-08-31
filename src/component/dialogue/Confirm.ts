import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Loader from "../Loader.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class Confirm extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    cancelTitle?: string;
    confirmTitle?: string;
  }, callback: () => Promise<void>) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".confirm",
        el("h1", options.title),
        el("p", options.message),
        el(
          "footer",
          new Button({
            type: ButtonType.Text,
            tag: ".cancel-button",
            click: () => this.delete(),
            title: options.cancelTitle ?? "Cancel",
          }),
          new Button({
            type: ButtonType.Text,
            tag: ".confirm-button",
            click: async (event, node) => {
              node.domElement.setAttribute("disabled", "disabled");
              node.empty().append(new Loader());
              await callback();
              this.delete();
            },
            title: options.confirmTitle ?? "Confirm",
          }),
        ),
      ),
    );
  }
}
