import el from "../dom/el.js";
import RetroComponent from "./RetroComponent.js";
export default class RetroTitleBar extends RetroComponent {
    constructor(options) {
        super("header.title-bar", el("h1", options.title), el(".controls", ...options.buttons.map((b) => el(`button.${b.type}`, { click: b.click }))));
    }
}
//# sourceMappingURL=RetroTitleBar.js.map