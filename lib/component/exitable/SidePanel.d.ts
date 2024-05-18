import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default abstract class SidePanel extends Exitable {
    protected container: Component;
    constructor(tag: string, options: {
        toLeft?: boolean;
        hasHidingAnimation?: boolean;
    });
}
//# sourceMappingURL=SidePanel.d.ts.map