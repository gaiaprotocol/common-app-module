import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
import ButtonType from "../button/ButtonType.js";
export default class Confirm extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        cancelTitle?: string;
        confirmTitle?: string;
        buttonType?: ButtonType;
    }, callback: () => Promise<void> | void, cancelCallback?: () => Promise<void> | void);
}
//# sourceMappingURL=Confirm.d.ts.map