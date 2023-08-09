import el from "../dom/el.js";
import RetroComponent from "./RetroComponent.js";
export default class RetroStatusBar extends RetroComponent {
    constructor(options) {
        super(".status-bar", ...options.statuses.map((s) => el(".status", s)));
    }
}
//# sourceMappingURL=RetroStatusBar.js.map