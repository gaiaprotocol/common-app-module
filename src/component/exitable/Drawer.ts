import Component from "../Component.js";
import Exitable from "./Exitable.js";

export default abstract class Drawer extends Exitable {
  protected container: Component;

  constructor(tag: string, options: { hasHidingAnimation?: boolean }) {
    super(".drawer-overlay", {
      barrierDismissible: true,
      ...options,
    });
    this.container = new Component(".drawer" + tag).appendTo(this);
  }
}
