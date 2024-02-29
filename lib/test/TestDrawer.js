import Drawer from "../component/exitable/Drawer.js";
import el from "../dom/el.js";
export default class TestDrawer extends Drawer {
    constructor() {
        super(".test-drawer", { hasHidingAnimation: true });
        this.container.append(el("header", el("h1", "Test Drawer")));
    }
}
//# sourceMappingURL=TestDrawer.js.map