import Popup from "../exitable/Popup.js";
export default class Alert extends Popup {
    constructor(options: {
        title: string;
        message: string;
        confirmTitle?: string;
    }, callback?: () => Promise<void> | void);
}
//# sourceMappingURL=Alert.d.ts.map