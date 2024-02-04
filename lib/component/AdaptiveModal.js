import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
export default class AdaptiveModal extends DomNode {
    constructor(options) {
        super(".adaptive-modal-background");
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
//# sourceMappingURL=AdaptiveModal.js.map