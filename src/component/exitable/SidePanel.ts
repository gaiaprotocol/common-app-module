import Component from "../Component.js";
import Exitable from "./Exitable.js";

export default abstract class SidePanel extends Exitable {
  protected container: Component;

  constructor(tag: string, options: {
    toLeft?: boolean;
    hasHidingAnimation?: boolean;
  }) {
    super(".side-panel-overlay", {
      barrierDismissible: true,
      ...options,
    });
    this.container = new Component(
      ".side-panel" + tag + (options.toLeft ? ".to-left" : ""),
    ).appendTo(this);
  }
}
