import DomNode from "../../dom/DomNode.js";
import Popup from "../exitable/Popup.js";
export default class Confirm extends Popup {
    private resolve;
    private reject;
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        cancelTitle?: string;
        confirmTitle?: string;
    }, callback: () => Promise<void> | void, cancelCallback?: () => Promise<void> | void);
    wait(): Promise<void>;
}
//# sourceMappingURL=Confirm.d.ts.map