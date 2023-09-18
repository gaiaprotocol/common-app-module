import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class Alert extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        confirmTitle?: string;
    });
}
//# sourceMappingURL=Alert.d.ts.map