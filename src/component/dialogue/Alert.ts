import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";

export default class Alert extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    confirmTitle: string;
  }) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".alert",
        el("h1", options.title),
        el("p", options.message),
        el(
          "footer",
          el(
            "button.confirm-button",
            { click: () => this.delete() },
            options.confirmTitle,
          ),
        ),
      ),
    );
  }
}
