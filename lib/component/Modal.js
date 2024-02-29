import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
export default class Modal extends DomNode {
    constructor(options) {
        super(".overlay.exitable");
        if (options.barrierDismissible === true) {
            this.onDom("click", (event) => {
                if (event.target === this.domElement) {
                    this.delete();
                }
            });
        }
        BodyNode.append(this);
    }
}
//# sourceMappingURL=Modal.js.map