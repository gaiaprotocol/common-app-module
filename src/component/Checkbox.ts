import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import Component from "./Component.js";

export default class Checkbox extends Component {
  private input: DomNode<HTMLInputElement>;

  constructor() {
    super(".checkbox");
    this.addAllowedEvents("check", "uncheck");

    this.append(
      this.input = el("input", { type: "checkbox" }),
      el(".checkmark"),
    );

    this.onDom(
      "click",
      (event) => {
        event.stopPropagation();
        this.toggle();
      },
    );
  }

  public get checked() {
    return this.input.domElement.checked;
  }

  public check() {
    if (this.checked) return;
    this.input.domElement.checked = true;
    this.fireEvent("check");
  }

  public uncheck() {
    if (!this.checked) return;
    this.input.domElement.checked = false;
    this.fireEvent("uncheck");
  }

  public toggle() {
    this.input.domElement.checked ? this.uncheck() : this.check();
  }
}
