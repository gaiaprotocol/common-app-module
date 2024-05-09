import MaterialIcon from "../component/MaterialIcon.js";
import Button from "../component/button/Button.js";
import ButtonType from "../component/button/ButtonType.js";
import Popup from "../component/exitable/Popup.js";
import el from "../dom/el.js";
import msg from "../i18n/msg.js";

export default class ExitAppPopup extends Popup {
  constructor() {
    super(".exit-app-popup", { barrierDismissible: true });
    this.header.append(
      el("h1", msg("exit-app-popup-title")),
      new Button({
        tag: ".close",
        type: ButtonType.Circle,
        icon: new MaterialIcon("close"),
        click: () => this.delete(),
      }),
    );
    this.main.append(
      el("p", msg("exit-app-popup-message")),
    );
    this.footer.append(
      new Button({
        tag: ".cancel",
        title: "No",
        click: () => this.delete(),
      }),
      new Button({
        tag: ".confirm",
        title: "Yes",
        click: () => window.history.back(),
      }),
    );
  }
}
