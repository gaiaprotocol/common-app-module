import { v4 as uuidv4 } from "uuid";
import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";

export default class Checkbox extends Component {
  private input: DomNode<HTMLInputElement>;

  constructor(options: { label?: string } = {}) {
    super(".checkbox");
    this.addAllowedEvents("check", "uncheck");

    const id = uuidv4();
    this.append(
      el(
        ".checkmark-container",
        this.input = el("input", { id, type: "checkbox" }),
        el(".checkmark"),
      ),
      options.label ? el("label", options.label, { for: id }) : undefined,
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
    this.emit("check");
  }

  public uncheck() {
    if (!this.checked) return;
    this.input.domElement.checked = false;
    this.emit("uncheck");
  }

  public toggle() {
    this.input.domElement.checked ? this.uncheck() : this.check();
  }
}
