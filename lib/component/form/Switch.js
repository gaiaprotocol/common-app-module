import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Switch extends Component {
    constructor(value) {
        super("label.switch");
        this.addAllowedEvents("change");
        this.append(el("input", {
            type: "checkbox",
            checked: value ? "checked" : undefined,
            change: (event) => this.emit("change", event.target.checked),
        }), el("span.slider"));
    }
}
//# sourceMappingURL=Switch.js.map