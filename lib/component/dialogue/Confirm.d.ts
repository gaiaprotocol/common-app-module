import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class Confirm extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        cancelTitle?: string;
        confirmTitle?: string;
    }, callback: () => Promise<void>, cancelCallback?: () => Promise<void>);
}
//# sourceMappingURL=Confirm.d.ts.map