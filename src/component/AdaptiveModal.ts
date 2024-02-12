import BodyNode from "../dom/BodyNode.js";
import DomNode, { DomChild } from "../dom/DomNode.js";
import el from "../dom/el.js";
import msg from "../i18n/msg.js";
import Component from "./Component.js";
import Icon from "./Icon.js";
import Button from "./button/Button.js";

export default abstract class AdaptiveModal extends DomNode {
  private titleDisplay: DomNode;
  protected container: DomNode;

  constructor(
    tag: string,
    options: { title?: DomChild; barrierDismissible: boolean },
  ) {
    super(".adaptive-modal-background.exitable-fragment");
    new Component(
      ".adaptive-modal" + tag,
      el(
        "header",
        new Button({
          tag: ".back",
          icon: new Icon("back"),
          click: () => this.delete(),
        }),
        this.titleDisplay = el("h1", options.title),
        new Button({
          tag: ".close",
          icon: new Icon("x"),
          click: () => this.delete(),
        }),
      ),
      this.container = el("main"),
      el(
        "footer",
        new Button({
          tag: ".cancel",
          title: msg("cancel-button"),
          click: () => this.delete(),
        }),
      ),
    ).appendTo(this);

    if (options.barrierDismissible === true) {
      this.onDom("click", (event: MouseEvent) => {
        if (event.target === this.domElement) {
          this.delete();
        }
      });
    }
    BodyNode.append(this);
  }

  protected set title(title: DomChild | DomChild[]) {
    this.titleDisplay.empty().append(
      ...(Array.isArray(title) ? title : [title]),
    );
  }
}
