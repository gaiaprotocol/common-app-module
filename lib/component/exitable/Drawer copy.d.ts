import Component from "../Component.js";
import Exitable from "./Exitable.js";
export default abstract class Drawer extends Exitable {
    protected container: Component;
    constructor(tag: string, options: {
        hasHidingAnimation?: boolean;
    });
}
//# sourceMappingURL=Drawer%20copy.d.ts.map