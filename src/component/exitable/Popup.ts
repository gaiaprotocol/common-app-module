import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Exitable, { ExitableOptions } from "./Exitable.js";

export default abstract class Popup extends Exitable {
  protected container: Component;

  protected header: DomNode;
  protected main: DomNode;
  protected footer: DomNode;

  constructor(tag: string, options: ExitableOptions) {
    super(".popup-overlay", options);
    this.container = new Component(
      ".popup" + tag,
      this.header = el("header"),
      this.main = el("main"),
      this.footer = el("footer"),
    ).appendTo(this);
  }
}
