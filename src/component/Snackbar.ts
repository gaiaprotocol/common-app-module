import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";
import Icon from "./Icon.js";
import Button from "./button/Button.js";
import ButtonType from "./button/ButtonType.js";

export default class Snackbar extends Component {
  private timeoutId: number;

  constructor(options: {
    message: string;
    action?: {
      title: string;
      click: () => void;
    };
  }) {
    super(".snackbar");

    this.append(
      el(
        "main",
        el("p", options.message),
        options.action
          ? new Button({
            tag: ".action",
            type: ButtonType.Text,
            title: options.action.title,
            click: () => {
              options.action?.click();
              this.delete();
            },
          })
          : undefined,
        el("button.close", new Icon("x"), {
          click: () => this.delete(),
        }),
      ),
    );
    BodyNode.append(this);

    this.timeoutId = setTimeout(() => this.delete(), 5000) as any;
  }

  public delete() {
    clearTimeout(this.timeoutId);
    super.delete();
  }
}
