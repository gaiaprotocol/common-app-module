import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";

export default abstract class Popup extends DomNode {
  constructor(options: { barrierDismissible: boolean }) {
    super(".popup-background");
    this.onDom("click", (event: MouseEvent) => {
      if (
        options.barrierDismissible === true &&
        event.target === this.domElement
      ) {
        this.delete();
      }
    });
    BodyNode.append(this);
  }
}
