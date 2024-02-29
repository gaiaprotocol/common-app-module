import Component from "../Component.js";
import Exitable, { ExitableOptions } from "./Exitable.js";

export default abstract class AdaptiveModal extends Exitable {
  protected container: Component;

  constructor(tag: string, options: ExitableOptions) {
    super(options);
    this.container = new Component(".adaptive-modal" + tag).appendTo(this);
  }
}
