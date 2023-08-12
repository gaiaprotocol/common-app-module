import { v4 as uuidv4 } from "uuid";
import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import RetroComponent from "./RetroComponent.js";

export default class Checkbox extends RetroComponent {
  private input: DomNode<HTMLInputElement>;

  constructor(options: {
    label: string;
  }) {
    super(".checkbox");

    const id = uuidv4();
    this.append(
      this.input = el("input", { id, type: "checkbox" }),
      el("label", { for: id }, options.label),
    );
  }

  public get checked() {
    return this.input.domElement.checked;
  }
}
