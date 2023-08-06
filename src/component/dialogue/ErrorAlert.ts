import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";

export default class ErrorAlert extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    confirmTitle: string;
  }) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".error-alert",
        el(
          "header",
          el("i.fa-light.fa-triangle-exclamation"),
          el("h1", options.title),
        ),
        el("main", el("p", options.message)),
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
