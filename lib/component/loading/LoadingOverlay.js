import BodyNode from "../../dom/BodyNode.js";
import Component from "../Component.js";
export default class LoadingOverlay extends Component {
    constructor(message) {
        super(".exitable.loading-overlay");
        this.text = message;
        this.appendTo(BodyNode);
    }
}
//# sourceMappingURL=LoadingOverlay.js.map