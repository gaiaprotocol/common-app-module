import el from "../../dom/el.js";
import Icon from "../Icon.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";

export default class ErrorAlert extends Popup {
  constructor(options: {
    title: string;
    message: string;
    confirmTitle?: string;
  }) {
    super(".error-alert", {
      barrierDismissible: true,
      hasHidingAnimation: true,
    });
    this.header.append(el("h1", new Icon("error"), options.title));
    this.main.append(el("p", options.message));
    this.footer.append(
      new Button({
        tag: ".confirm-button",
        title: options.confirmTitle ?? "OK",
        click: () => this.delete(),
      }),
    );
  }
}
