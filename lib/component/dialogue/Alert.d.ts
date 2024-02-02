import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class Alert extends Popup {
    content: DomNode;
    constructor(options: {
        title: string;
        message: string;
        confirmTitle?: string;
    }, callback?: () => Promise<void> | void);
}
//# sourceMappingURL=Alert.d.ts.map