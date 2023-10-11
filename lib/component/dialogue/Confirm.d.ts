import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class Confirm extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        cancelTitle?: string;
        confirmTitle?: string;
        loadingTitle?: string;
    }, callback: () => Promise<void> | void, cancelCallback?: () => Promise<void> | void);
}
//# sourceMappingURL=Confirm.d.ts.map