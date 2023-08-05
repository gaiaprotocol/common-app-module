import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";

export default class Confirm extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    cancelTitle: string;
    confirmTitle: string;
    confirmColor: string;
  }, callback: () => void) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".confirm",
        el("h1", options.title),
        el("p", options.message),
        el(
          "footer",
          el(
            "button.cancel-button",
            { click: () => this.delete() },
            options.cancelTitle,
          ),
          el(
            "button.confirm-button",
            {
              click: () => {
                callback();
                this.delete();
              },
              style: `background-color: ${options.confirmColor}`,
            },
            options.confirmTitle,
          ),
        ),
      ),
    );
  }
}
