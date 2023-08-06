import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class ErrorAlert extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        confirmTitle: string;
    });
}
//# sourceMappingURL=ErrorAlert.d.ts.map