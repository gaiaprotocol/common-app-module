import DomNode from "../../dom/DomNode.js";
import Popup from "../exitable/Popup.js";
export default class Alert extends Popup {
    constructor(options: {
        icon?: DomNode;
        title: string;
        message: string;
        confirmTitle?: string;
    }, callback?: () => Promise<void> | void);
}
//# sourceMappingURL=Alert.d.ts.map