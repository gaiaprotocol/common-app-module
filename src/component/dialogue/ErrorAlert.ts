import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class Alert extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    confirmTitle?: string;
  }) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".popup.error-alert",
        el("header", el("h1", new MaterialIcon("error"), options.title)),
        el("main", el("p", options.message)),
        el(
          "footer",
          new Button({
            type: ButtonType.Text,
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: () => this.delete(),
          }),
        ),
      ),
    );
  }
}
