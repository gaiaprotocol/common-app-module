import el from "../../dom/el.js";
import Component from "../Component.js";
export default class Checkbox extends Component {
    input;
    constructor() {
        super(".checkbox");
        this.addAllowedEvents("check", "uncheck");
        this.append(this.input = el("input", { type: "checkbox" }), el(".checkmark"));
        this.onDom("click", (event) => {
            event.stopPropagation();
            this.toggle();
        });
    }
    get checked() {
        return this.input.domElement.checked;
    }
    check() {
        if (this.checked)
            return;
        this.input.domElement.checked = true;
        this.fireEvent("check");
    }
    uncheck() {
        if (!this.checked)
            return;
        this.input.domElement.checked = false;
        this.fireEvent("uncheck");
    }
    toggle() {
        this.input.domElement.checked ? this.uncheck() : this.check();
    }
}
//# sourceMappingURL=Checkbox.js.map