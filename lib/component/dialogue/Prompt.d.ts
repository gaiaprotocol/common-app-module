import Popup from "../exitable/Popup.js";
export default class Prompt extends Popup {
    private input;
    private resolve;
    private reject;
    constructor(options: {
        title: string;
        message: string;
        placeholder?: string;
        value?: string;
        info?: string;
        cancelTitle?: string;
        confirmTitle?: string;
    }, callback: (value: string) => Promise<void> | void, cancelCallback?: () => Promise<void> | void);
    set value(value: string);
    wait(): Promise<string>;
}
//# sourceMappingURL=Prompt.d.ts.map