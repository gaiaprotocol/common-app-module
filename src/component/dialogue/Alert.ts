import el from "../../dom/el.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";

export default class Alert extends Popup {
  constructor(options: {
    title: string;
    message: string;
    confirmTitle?: string;
  }, callback?: () => Promise<void> | void) {
    super(".alert", { barrierDismissible: true });
    this.header.append(el("h1", options.title));
    this.main.append(el("p", options.message));
    this.footer.append(
      new Button({
        tag: ".confirm-button",
        title: options.confirmTitle ?? "OK",
        click: async () => {
          if (callback) await callback();
          this.delete();
        },
      }),
    );
  }
}
